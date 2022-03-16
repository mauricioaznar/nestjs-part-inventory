import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartsService } from '../../../entities/parts/parts.service';
import { RawMaterialsSeed } from '../../types/raw-materials-seed';
import { BasicMaterialsSeed } from '../../types/basic-materials-seed';
import { AllPartsSeed } from '../../types/all-parts-seed';
import { ElectronicSeed } from '../../types/electronic-seed';
import { PartCategoriesService } from '../../../entities/part-categories/part-categories.service';
import { PartCategory } from '../../../common/dto/entities/part-categories.dto';
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
    const electronics = await this.partCategoriesService.addCategory({
      name: 'Electronics',
    });

    return {
      rawMaterials,
      basicMaterials,
      electronics,
    };
  }
}
