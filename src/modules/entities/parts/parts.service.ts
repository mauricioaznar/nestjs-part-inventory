import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { Part, PartInput } from '../../common/dto/entities/parts.dto';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async createPart(partInput: PartInput): Promise<Part> {
    return this.prisma.part.create({
      data: {
        partCategoryId: partInput.partCategoryId,
        name: partInput.name,
        imageUrl: partInput.imageUrl,
        defaultGeneratedQuantity: partInput.defaultGeneratedQuantity,
      },
    });
  }

  async getPart(id: number): Promise<Part> {
    return this.prisma.part.findFirst({
      where: {
        partId: id,
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
        partId: id,
      },
      data: {
        name: partInput.name,
        imageUrl: partInput.imageUrl,
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
        parentId: part.partId,
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
        componentId: part.partId,
      },
    });
  }
}
