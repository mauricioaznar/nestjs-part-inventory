import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Part } from '../../dto/entities/parts.dto';

@Injectable()
export class PartInventoryService {
  constructor(private prisma: PrismaService) {}

  async getCurrentQuantity(partId: number): Promise<number> {
    const additionsTotal = await this.getAdditionsTotal(partId);
    const subtractionsTotal = await this.getSubtractionTotal(partId);
    return additionsTotal - subtractionsTotal;
  }

  async craft(partId: number): Promise<void> {
    const partComponents = await this.prisma.partAssignment.findMany({
      where: {
        parent_id: partId,
      },
    });

    for (const component of partComponents) {
      const componentCurrentQuantity = await this.getCurrentQuantity(
        component.component_id,
      );

      if (componentCurrentQuantity < component.quantity) {
        throw new BadRequestException('Not enough component parts to craft');
      }

      await this.prisma.partSubtraction.create({
        data: {
          part_id: component.component_id,
          quantity: component.quantity,
        },
      });
    }

    await this.prisma.partAddition.create({
      data: {
        part_id: partId,
        quantity: 1,
      },
    });
  }

  async add(partId: number): Promise<void> {
    const part = await this.prisma.part.findFirst({
      select: {
        name: true,
        _count: {
          select: {
            components: true,
          },
        },
      },
      where: {
        part_id: partId,
      },
    });

    if (part._count.components !== 0) {
      throw new BadRequestException('Part cannot be added, it must be crafted');
    }

    await this.prisma.partAddition.create({
      data: {
        part_id: partId,
        quantity: 1,
      },
    });
  }

  private async getAdditionsTotal(partId: number): Promise<number> {
    const {
      _sum: { quantity },
    } = await this.prisma.partAddition.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        part_id: partId,
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
        part_id: partId,
      },
    });
    return quantity || 0;
  }
}
