import { PartCategory } from '../../common/dto/entities/part-categories.dto';

export interface PartCategoriesSeed {
  basicMaterials: PartCategory;
  electronics: PartCategory;
  rawMaterials: PartCategory;
  advancedMaterials: PartCategory;
}
