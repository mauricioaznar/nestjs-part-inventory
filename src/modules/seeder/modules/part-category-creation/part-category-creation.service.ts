import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartCategoriesService } from '../../../entities/part-categories/part-categories.service';
import { PartCategoriesSeed } from '../../types/part-categories-seed';

@Injectable()
export class PartCategoryCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly partCategoriesService: PartCategoriesService,
  ) {}

  async createPartCategories(): Promise<PartCategoriesSeed> {
    const rawMaterials = await this.partCategoriesService.addCategory({
      name: 'Raw materials',
    });
    const basicMaterials = await this.partCategoriesService.addCategory({
      name: 'Basic materials',
    });
    const advancedMaterials = await this.partCategoriesService.addCategory({
      name: 'Advanced materials',
    });
    const electronics = await this.partCategoriesService.addCategory({
      name: 'Electronics',
    });

    return {
      rawMaterials,
      basicMaterials,
      advancedMaterials,
      electronics,
    };
  }
}
