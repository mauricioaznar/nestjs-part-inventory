import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartsService } from '../../../entities/parts/parts.service';
import { RawMaterialsSeed } from '../types/raw-materials-seed';
import { BasicMaterialsSeed } from '../types/basic-materials-seed';
import { AllPartsSeed } from '../types/all-parts-seed';
import { ElectronicSeed } from '../types/electronic-seed';

@Injectable()
export class PartCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly partsService: PartsService,
  ) {}

  async createParts(): Promise<AllPartsSeed> {
    const rawMaterials = await this.createRawMaterials();
    const basicMaterials = await this.createBasicMaterials();
    const electronics = await this.createElectronics();

    return {
      rawMaterials,
      basicMaterials,
      electronics,
    };
  }

  private async createRawMaterials(): Promise<RawMaterialsSeed> {
    const copperOre = await this.partsService.createPart({
      name: 'Copper ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/78/Copper_Ore.png',
    });
    const caveSulfur = await this.partsService.createPart({
      name: 'Cave sulfur',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/5d/Cave_Sulfur.png',
    });
    const crystallineSulfur = await this.partsService.createPart({
      name: 'Crystalline sulfur',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Crystalline_Sulfur.png',
    });
    const diamond = await this.partsService.createPart({
      name: 'Diamond',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Diamond.png',
    });
    const gold = await this.partsService.createPart({
      name: 'Gold',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/10/Gold.png',
    });
    const ionCube = await this.partsService.createPart({
      name: 'Ion cube',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/a9/IonCrystalItemNew.png',
    });
    const kyanite = await this.partsService.createPart({
      name: 'Kyanite',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/e4/Kyanite.png',
    });
    const lead = await this.partsService.createPart({
      name: 'Lead',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/e8/Lead.png',
    });
    const lithium = await this.partsService.createPart({
      name: 'Lithium',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Lithium.png',
    });
    const magnetite = await this.partsService.createPart({
      name: 'Magnetite',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/c8/Magnetite.png',
    });
    const nickelOre = await this.partsService.createPart({
      name: 'Nickel ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/f3/Nickel_Ore.png',
    });
    const quartz = await this.partsService.createPart({
      name: 'Quarz',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Quartz.png',
    });
    const ruby = await this.partsService.createPart({
      name: 'Ruby',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/b/b8/Aluminum_Oxide_Crystal.png',
    });
    const saltDeposit = await this.partsService.createPart({
      name: 'Salt deposit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/4c/Salt_Deposit.png',
    });
    const silverOre = await this.partsService.createPart({
      name: 'Silver ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/97/Silver_Ore.png',
    });
    const titanium = await this.partsService.createPart({
      name: 'Titanium',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cc/Titanium.png',
    });
    const uraniniteCrystal = await this.partsService.createPart({
      name: 'Uraninite crystal',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/51/Uraninite_Crystal.png',
    });
    const creepvineSample = await this.partsService.createPart({
      name: 'Creepvine sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/65/Creepvine_Sample.png',
    });
    const creepvineSeedCluster = await this.partsService.createPart({
      name: 'Creepvine seed cluster',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0c/Creepvine_Seed_Cluster.png',
    });
    const coralTubeSample = await this.partsService.createPart({
      name: 'Coral tube sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/3/3f/Coral_Tube_Sample.png',
    });
    const gelSack = await this.partsService.createPart({
      name: 'Gel sack',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/a3/Gel_Sack_Seed.png',
    });
    const tableCoralSample = await this.partsService.createPart({
      name: 'Table coral sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0a/Table_Coral_Sample.png',
    });
    const stalkerTeeth = await this.partsService.createPart({
      name: 'Stalker teeth',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/94/Stalker_Tooth.png',
    });

    return {
      copperOre,
      caveSulfur,
      crystallineSulfur,
      diamond,
      gold,
      ionCube,
      kyanite,
      lead,
      lithium,
      magnetite,
      nickelOre,
      quartz,
      ruby,
      saltDeposit,
      silverOre,
      titanium,
      uraniniteCrystal,
      creepvineSample,
      coralTubeSample,
      creepvineSeedCluster,
      gelSack,
      tableCoralSample,
      stalkerTeeth,
    };
  }

  private async createBasicMaterials(): Promise<BasicMaterialsSeed> {
    const bleach = await this.partsService.createPart({
      name: 'Bleach',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Bleach.png',
    });
    const enameledGlass = await this.partsService.createPart({
      name: 'Enameled glass',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/14/Enameled_Glass.png',
    });
    const fiberMesh = await this.partsService.createPart({
      name: 'Fiber mesh',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/fa/Fiber_Mesh.png',
    });
    const glass = await this.partsService.createPart({
      name: 'Glass',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/15/Glass.png',
    });
    const lubricant = await this.partsService.createPart({
      name: 'Lubricant',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/77/Lubricant.png',
    });
    const plasteelIngot = await this.partsService.createPart({
      name: 'Plasteel ingot',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/fc/Plasteel_Ingot.png',
    });
    const siliconeRubber = await this.partsService.createPart({
      name: 'Silicon rubber',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/d/d0/Silicone_Rubber.png',
    });
    const titaniumIngot = await this.partsService.createPart({
      name: 'Titanium ingot',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/61/Titanium_Ingot.png',
    });
    return {
      bleach,
      enameledGlass,
      fiberMesh,
      glass,
      lubricant,
      plasteelIngot,
      siliconeRubber,
      titaniumIngot,
    };
  }

  private async createElectronics(): Promise<ElectronicSeed> {
    const battery = await this.partsService.createPart({
      name: 'Battery',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/6d/Battery.png',
    });
    const computerChip = await this.partsService.createPart({
      name: 'Computer chip',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/6f/Computer_Chip.png',
    });
    const copperWire = await this.partsService.createPart({
      name: 'Copper wire',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/43/Copper_Wire.png',
    });
    const ionBattery = await this.partsService.createPart({
      name: 'Ion battery',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/9d/Ion_Battery.png',
    });
    const powerCell = await this.partsService.createPart({
      name: 'Power cell',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/9a/Power_Cell.png',
    });
    const wiringKit = await this.partsService.createPart({
      name: 'Wiring kit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/7b/Wiring_Kit.png',
    });
    const advancedWiringKit = await this.partsService.createPart({
      name: 'Advanced wiring kit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Advanced_Wiring_Kit.png',
    });
    return {
      advancedWiringKit,
      battery,
      computerChip,
      copperWire,
      ionBattery,
      powerCell,
      wiringKit,
    };
  }
}
