import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { Part, PartInput } from '../../common/dto/entities/parts.dto';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async createPart(partInput: PartInput): Promise<Part> {
    return this.prisma.part.create({
      data: {
        part_category_id: partInput.part_category_id,
        name: partInput.name,
        image_url: partInput.image_url,
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
        image_url: partInput.image_url,
      },
    });
  }

  async getProducts(): Promise<Part[]> {
    return this.prisma.part.findMany();
  }

  async getComponents(part: Part) {
    return await this.prisma.partAssignment.findMany({
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
