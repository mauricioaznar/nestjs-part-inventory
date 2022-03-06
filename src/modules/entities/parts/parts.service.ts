import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { Part, PartInput } from '../../common/dto/entities/parts.dto';
import { PartComponent } from '../../common/dto/entities/part-components.dto';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async createPart(partInput: PartInput): Promise<Part> {
    return this.prisma.part.create({
      data: {
        name: partInput.name,
      },
    });
  }

  async getPart(id: number): Promise<Part> {
    return this.prisma.part.findFirst({
      where: {
        part_id: id,
      },
    });
  }

  async updatePart(id: number, partInput: PartInput): Promise<Part> {
    return this.prisma.part.update({
      where: {
        part_id: id,
      },
      data: {
        name: partInput.name,
      },
    });
  }

  async getProducts(): Promise<Part[]> {
    return this.prisma.part.findMany();
  }

  async getComponents(part: Part) {
    return await this.prisma.partComponent.findMany({
      select: {
        component: true,
        quantity: true,
      },
      where: {
        parent_id: part.part_id,
      },
    });
  }
}
