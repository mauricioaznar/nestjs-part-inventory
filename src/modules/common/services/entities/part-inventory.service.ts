import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CraftInput, FarmInput } from '../../dto/entities/part-inventory.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class PartInventoryService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCurrentQuantity(partId: number): Promise<number> {
    const cachedCurrentQuantity = await this.getCurrentQuantityCachedValue({
      partId,
    });
    if (cachedCurrentQuantity !== null) return cachedCurrentQuantity;
    const additionsTotal = await this.getAdditionsTotal(partId);
    const subtractionsTotal = await this.getSubtractionTotal(partId);
    const currentQuantity = additionsTotal - subtractionsTotal;
    await this.setCurrentQuantityCachedValue({ partId, currentQuantity });
    return currentQuantity;
  }

  async craft(craftInput: CraftInput): Promise<void> {
    const doesPartExist = await this.doesPartExist(craftInput.partId);

    if (!doesPartExist) {
      throw new BadRequestException('Part not found');
    }

    const partComponents = await this.prisma.partAssignment.findMany({
      where: {
        parentId: craftInput.partId,
      },
    });

    if (partComponents.length === 0) {
      throw new BadRequestException('Part cannot be crafted');
    }

    if (craftInput.quantity < 1) {
      throw new BadRequestException('Quantity must be bigger than 0');
    }

    for (const component of partComponents) {
      const componentCurrentQuantity = await this.getCurrentQuantity(
        component.componentId,
      );

      if (
        componentCurrentQuantity <
        component.requiredQuantity * craftInput.quantity
      ) {
        throw new BadRequestException('Not enough component parts to craft');
      }
    }

    for (const component of partComponents) {
      await this.prisma.partSubtraction.create({
        data: {
          partId: component.componentId,
          quantity: craftInput.quantity * component.requiredQuantity,
        },
      });
      await this.deleteCurrentQuantityCachedValue({
        partId: component.componentId,
      });
    }

    const parent = await this.prisma.part.findFirst({
      where: {
        partId: craftInput.partId,
      },
    });

    await this.prisma.partAddition.create({
      data: {
        partId: craftInput.partId,
        quantity: craftInput.quantity * parent.defaultGeneratedQuantity,
      },
    });
    await this.deleteCurrentQuantityCachedValue({ partId: craftInput.partId });
  }

  async add(farmInput: FarmInput): Promise<void> {
    if (!(await this.doesPartExist(farmInput.partId))) {
      throw new BadRequestException('Part not found');
    }

    const part = await this.prisma.part.findFirst({
      select: {
        name: true,
        _count: {
          select: {
            parentAssignments: true,
          },
        },
      },
      where: {
        partId: farmInput.partId,
      },
    });

    if (part._count.parentAssignments !== 0) {
      throw new BadRequestException('Part cannot be added, it must be crafted');
    }

    if (farmInput.quantity < 1) {
      throw new BadRequestException('Quantity must be bigger than 0');
    }

    await this.prisma.partAddition.create({
      data: {
        partId: farmInput.partId,
        quantity: farmInput.quantity,
      },
    });
    await this.deleteCurrentQuantityCachedValue({ partId: farmInput.partId });
  }

  private async doesPartExist(partId: number): Promise<boolean> {
    return !!(await this.prisma.part.findFirst({ where: { partId: partId } }));
  }

  private async getAdditionsTotal(partId: number): Promise<number> {
    const {
      _sum: { quantity },
    } = await this.prisma.partAddition.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        partId: partId,
      },
    });
    return quantity || 0;
  }

  private async getSubtractionTotal(partId: number): Promise<number> {
    const {
      _sum: { quantity },
    } = await this.prisma.partSubtraction.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        partId: partId,
      },
    });
    return quantity || 0;
  }

  private async deleteCurrentQuantityCachedValue({
    partId,
  }: {
    partId: number;
  }) {
    await this.cacheManager.del(`partId_${partId}`);
  }

  private async setCurrentQuantityCachedValue({
    partId,
    currentQuantity,
  }: {
    partId: number;
    currentQuantity: number;
  }) {
    await this.cacheManager.set(`partId_${partId}`, currentQuantity);
  }

  private async getCurrentQuantityCachedValue({
    partId,
  }: {
    partId: number;
  }): Promise<number | null> {
    const currentQuantity = await this.cacheManager.get(`partId_${partId}`);
    if (!currentQuantity) return null;
    return Number(currentQuantity);
  }
}
