import { Injectable, NotFoundException } from '@nestjs/common';
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
        default_generated_quantity: partInput.default_generated_quantity,
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
    const part = await this.getPart(id);

    if (!part) {
      throw new NotFoundException(`part with id '${id}' not found`);
    }

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

  async getParts(): Promise<Part[]> {
    return this.prisma.part.findMany();
  }

  async getComponentAssignments(part: Part) {
    return await this.prisma.partAssignment.findMany({
      select: {
        component: true,
        requiredQuantity: true,
      },
      where: {
        parentId: part.part_id,
      },
    });
  }

  async getParentAssignments(part: Part) {
    return await this.prisma.partAssignment.findMany({
      select: {
        parent: true,
        requiredQuantity: true,
      },
      where: {
        componentId: part.part_id,
      },
    });
  }
}
