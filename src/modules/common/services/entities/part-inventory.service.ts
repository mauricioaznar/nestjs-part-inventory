import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Part } from '../../dto/entities/parts.dto';

@Injectable()
export class PartInventoryService {
  constructor(private prisma: PrismaService) {}

  async getCurrentQuantity(part: Part): Promise<number> {
    const additionsTotal = await this.getAdditionsTotal(part);
    const subtractionsTotal = await this.getSubtractionTotal(part);
    return additionsTotal - subtractionsTotal;
  }

  private async getAdditionsTotal(part: Part): Promise<number> {
    const {
      _sum: { quantity },
    } = await this.prisma.partAddition.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        part_id: part.part_id,
      },
    });
    return quantity || 0;
  }

  private async getSubtractionTotal(part: Part): Promise<number> {
    const {
      _sum: { quantity },
    } = await this.prisma.partSubtraction.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        part_id: part.part_id,
      },
    });
    return quantity || 0;
  }
}
