import { RawMaterialsSeed } from './raw-materials-seed';
import { BasicMaterialsSeed } from './basic-materials-seed';
import { ElectronicSeed } from './electronic-seed';

export interface AllPartsSeed {
  rawMaterials: RawMaterialsSeed;
  basicMaterials: BasicMaterialsSeed;
  electronics: ElectronicSeed;
}
