import { RawMaterialsSeed } from './raw-materials-seed';
import { BasicMaterialsSeed } from './basic-materials-seed';

export interface AllPartsSeed {
  rawMaterials: RawMaterialsSeed;
  basicMaterials: BasicMaterialsSeed;
}
