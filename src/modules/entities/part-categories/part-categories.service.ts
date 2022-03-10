import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import {
  PartCategory,
  PartCategoryInput,
} from '../../common/dto/entities/part-categories.dto';
import { Part } from '../../common/dto/entities/parts.dto';

@Injectable()
export class PartCategoriesService {
  constructor(private prisma: PrismaService) {}

  async addCategory(
    partCategoryInput: PartCategoryInput,
  ): Promise<PartCategory> {
    const doesCategoryExistWithName = await this.prisma.partCategory.findFirst({
      where: {
        name: partCategoryInput.name,
      },
    });

    if (doesCategoryExistWithName) {
      throw new BadRequestException('Category already exists');
    }

    return this.prisma.partCategory.create({
      data: {
        name: partCategoryInput.name,
      },
    });
  }

  async getPartCategories(): Promise<PartCategory[]> {
    return this.prisma.partCategory.findMany();
  }

  async getParts(partCategory: PartCategory): Promise<Part[]> {
    return this.prisma.part.findMany({
      where: {
        part_category_id: partCategory.part_category_id,
      },
    });
  }
}
