import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartsService } from '../../../entities/parts/parts.service';
import { RawMaterialsSeed } from '../../types/raw-materials-seed';
import { BasicMaterialsSeed } from '../../types/basic-materials-seed';
import { AllPartsSeed } from '../../types/all-parts-seed';
import { ElectronicSeed } from '../../types/electronic-seed';
import { PartCategoriesSeed } from '../../types/part-categories-seed';
import { AdvancedMaterialsSeed } from '../../types/advanced-materials-seed';
import { DeployablesSeed } from '../../types/deployables-seed';
import { Part } from '../../../common/dto/entities/parts.dto';
import { EquipmentsSeed } from '../../types/equipments-seed';
import { ToolsSeed } from '../../types/tools-seed';

@Injectable()
export class PartCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly partsService: PartsService,
  ) {}

  async createParts(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<AllPartsSeed> {
    const rawMaterials = await this.createRawMaterials(partCategoriesSeed);
    const basicMaterials = await this.createBasicMaterials(partCategoriesSeed);
    const electronics = await this.createElectronics(partCategoriesSeed);
    const advancedMaterials = await this.createAdvancedMaterials(
      partCategoriesSeed,
    );
    const deployables = await this.createDeployables(partCategoriesSeed);
    const equipments = await this.createEquipments(partCategoriesSeed);
    const tools = await this.createTools(partCategoriesSeed);

    return {
      rawMaterials,
      basicMaterials,
      electronics,
      advancedMaterials,
      deployables,
      equipments,
      tools,
    };
  }

  private async createRawMaterials(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<RawMaterialsSeed> {
    const copperOre = await this.partsService.createPart({
      name: 'Copper ore',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/7/78/Copper_Ore.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const caveSulfur = await this.partsService.createPart({
      name: 'Cave sulfur',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/5d/Cave_Sulfur.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const crystallineSulfur = await this.partsService.createPart({
      name: 'Crystalline sulfur',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Crystalline_Sulfur.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const diamond = await this.partsService.createPart({
      name: 'Diamond',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Diamond.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const gold = await this.partsService.createPart({
      name: 'Gold',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/1/10/Gold.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const ionCube = await this.partsService.createPart({
      name: 'Ion cube',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/a/a9/IonCrystalItemNew.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const kyanite = await this.partsService.createPart({
      name: 'Kyanite',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/e4/Kyanite.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const lead = await this.partsService.createPart({
      name: 'Lead',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/e8/Lead.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const lithium = await this.partsService.createPart({
      name: 'Lithium',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Lithium.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const magnetite = await this.partsService.createPart({
      name: 'Magnetite',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/c/c8/Magnetite.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const nickelOre = await this.partsService.createPart({
      name: 'Nickel ore',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/f/f3/Nickel_Ore.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const quartz = await this.partsService.createPart({
      name: 'Quarz',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Quartz.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const ruby = await this.partsService.createPart({
      name: 'Ruby',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/b/b8/Aluminum_Oxide_Crystal.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const saltDeposit = await this.partsService.createPart({
      name: 'Salt deposit',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/4/4c/Salt_Deposit.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const silverOre = await this.partsService.createPart({
      name: 'Silver ore',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/97/Silver_Ore.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const titanium = await this.partsService.createPart({
      name: 'Titanium',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/c/cc/Titanium.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const uraniniteCrystal = await this.partsService.createPart({
      name: 'Uraninite crystal',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/51/Uraninite_Crystal.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const creepvineSample = await this.partsService.createPart({
      name: 'Creepvine sample',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/65/Creepvine_Sample.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const creepvineSeedCluster = await this.partsService.createPart({
      name: 'Creepvine seed cluster',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/0/0c/Creepvine_Seed_Cluster.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const coralTubeSample = await this.partsService.createPart({
      name: 'Coral tube sample',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/3/3f/Coral_Tube_Sample.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const gelSack = await this.partsService.createPart({
      name: 'Gel sack',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/a/a3/Gel_Sack_Seed.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const tableCoralSample = await this.partsService.createPart({
      name: 'Table coral sample',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/0/0a/Table_Coral_Sample.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const stalkerTeeth = await this.partsService.createPart({
      name: 'Stalker teeth',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/94/Stalker_Tooth.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const bloodOil = await this.partsService.createPart({
      name: 'Blood oil',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/7/7b/Blood_Oil.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const deepShroom = await this.partsService.createPart({
      name: 'Deep shroom',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/e5/Deep_Shroom.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const acidShroom = await this.partsService.createPart({
      name: 'Acid shroom',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/f/ff/Acid_Mushroom.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
    });
    const bladderfish = await this.partsService.createPart({
      name: 'Bladderfish',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/a/a5/Bladderfish.png',
      partCategoryId: partCategoriesSeed.rawMaterials.partCategoryId,
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
      bloodOil,
      deepShroom,
      acidShroom,
      bladderfish,
    };
  }

  private async createBasicMaterials(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<BasicMaterialsSeed> {
    const bleach = await this.partsService.createPart({
      name: 'Bleach',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Bleach.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const enameledGlass = await this.partsService.createPart({
      name: 'Enameled glass',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/1/14/Enameled_Glass.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const fiberMesh = await this.partsService.createPart({
      name: 'Fiber mesh',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/f/fa/Fiber_Mesh.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const glass = await this.partsService.createPart({
      name: 'Glass',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/1/15/Glass.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const lubricant = await this.partsService.createPart({
      name: 'Lubricant',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/7/77/Lubricant.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const plasteelIngot = await this.partsService.createPart({
      name: 'Plasteel ingot',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/f/fc/Plasteel_Ingot.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const siliconeRubber = await this.partsService.createPart({
      name: 'Silicon rubber',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/d/d0/Silicone_Rubber.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
    });
    const titaniumIngot = await this.partsService.createPart({
      name: 'Titanium ingot',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/61/Titanium_Ingot.png',
      partCategoryId: partCategoriesSeed.basicMaterials.partCategoryId,
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

  private async createElectronics(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<ElectronicSeed> {
    const battery = await this.partsService.createPart({
      name: 'Battery',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/6d/Battery.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
    });
    const computerChip = await this.partsService.createPart({
      name: 'Computer chip',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/6f/Computer_Chip.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
    });
    const copperWire = await this.partsService.createPart({
      name: 'Copper wire',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/4/43/Copper_Wire.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
    });
    const ionBattery = await this.partsService.createPart({
      name: 'Ion battery',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/9d/Ion_Battery.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
    });
    const powerCell = await this.partsService.createPart({
      name: 'Power cell',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/9a/Power_Cell.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
    });
    const wiringKit = await this.partsService.createPart({
      name: 'Wiring kit',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/7/7b/Wiring_Kit.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
    });
    const advancedWiringKit = await this.partsService.createPart({
      name: 'Advanced wiring kit',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Advanced_Wiring_Kit.png',
      partCategoryId: partCategoriesSeed.electronics.partCategoryId,
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

  private async createAdvancedMaterials(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<AdvancedMaterialsSeed> {
    const aerogel = await this.partsService.createPart({
      name: 'Aerogel',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/66/Aerogel.png',
      partCategoryId: partCategoriesSeed.advancedMaterials.partCategoryId,
    });
    const benzene = await this.partsService.createPart({
      name: 'Benzene',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/9b/Benzene.png',
      partCategoryId: partCategoriesSeed.advancedMaterials.partCategoryId,
    });
    const hydraulicFluid = await this.partsService.createPart({
      name: 'Hydraulic fluid',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/3/3d/Hydraulic_Fluid_Icon.png',
      partCategoryId: partCategoriesSeed.advancedMaterials.partCategoryId,
    });
    const hydrochloricAcid = await this.partsService.createPart({
      name: 'Hydrochloric acid',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/9a/Hydrochloric_Acid.png',
      partCategoryId: partCategoriesSeed.advancedMaterials.partCategoryId,
    });
    const polyaniline = await this.partsService.createPart({
      name: 'Polyaniline',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/8/82/Polyaniline.png',
      partCategoryId: partCategoriesSeed.advancedMaterials.partCategoryId,
    });
    const syntheticFibers = await this.partsService.createPart({
      name: 'Synthetic fibers',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/8/86/Synthetic_Fibers.png',
      partCategoryId: partCategoriesSeed.advancedMaterials.partCategoryId,
    });

    return {
      aerogel,
      benzene,
      hydraulicFluid,
      hydrochloricAcid,
      polyaniline,
      syntheticFibers,
    };
  }

  private async createDeployables(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<DeployablesSeed> {
    const beacon = await this.partsService.createPart({
      name: 'Beacon',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/b/b3/Beacon.png',
      partCategoryId: partCategoriesSeed.deployables.partCategoryId,
    });
    const gravTrap = await this.partsService.createPart({
      name: 'Grav trap',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/5d/Grav_Trap.png',
      partCategoryId: partCategoriesSeed.deployables.partCategoryId,
    });
    const mobileVehicleBay = await this.partsService.createPart({
      name: 'Mobile vehicle bay',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/3/30/Mobile_Vehicle_Bay.png',
      partCategoryId: partCategoriesSeed.deployables.partCategoryId,
    });
    const seaglide = await this.partsService.createPart({
      name: 'Seaglide',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/6a/Seaglide.png',
      partCategoryId: partCategoriesSeed.deployables.partCategoryId,
    });
    const waterproofLocker = await this.partsService.createPart({
      name: 'Waterproof locker',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Waterproof_Locker.png',
      partCategoryId: partCategoriesSeed.deployables.partCategoryId,
    });
    return {
      beacon,
      gravTrap,
      mobileVehicleBay,
      seaglide,
      waterproofLocker,
    };
  }

  private async createEquipments(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<EquipmentsSeed> {
    const compass = await this.partsService.createPart({
      name: 'Compass',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Compass.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });
    const fins = await this.partsService.createPart({
      name: 'Fins',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/c/ce/Fins.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });
    const fireExtinguisher = await this.partsService.createPart({
      name: 'Fire extinguisher',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/0/0a/Fire_Extinguisher.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });
    const firstAidKit = await this.partsService.createPart({
      name: 'First aid kit',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/50/First_Aid_Kit.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });
    const headlamp = await this.partsService.createPart({
      name: 'Head lamp',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/5e/Headlamp_Icon.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    const highCapacityO2Tank = await this.partsService.createPart({
      name: 'High capacity tank',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/b/b1/High_Capacity_Tank.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    const lightweightHighCapacityTank = await this.partsService.createPart({
      name: 'Lightweight high capacity tank',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/8/81/Plasteel_Tank.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    const radiationSuit = await this.partsService.createPart({
      name: 'Radiation suit',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/3/3f/Radiation_Suit.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    const rebreather = await this.partsService.createPart({
      name: 'Rebreather',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/b/bb/Rebreather.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    const standardO2Tank = await this.partsService.createPart({
      name: 'Standard tank',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/c/cb/Standard_O%E2%82%82_Tank.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    const ultraHighCapacityTank = await this.partsService.createPart({
      name: 'Ultra high capacity tank',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/ee/Ultra_High_Capacity_Tank.png',
      partCategoryId: partCategoriesSeed.equipments.partCategoryId,
    });

    return {
      compass,
      fins,
      fireExtinguisher,
      firstAidKit,
      headlamp,
      highCapacityO2Tank,
      lightweightHighCapacityTank,
      radiationSuit,
      rebreather,
      standardO2Tank,
      ultraHighCapacityTank,
    };
  }

  private async createTools(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<ToolsSeed> {
    const airBladder = await this.partsService.createPart({
      name: 'Air bladder',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/8/86/Air_Bladder.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const flare = await this.partsService.createPart({
      name: 'Flare',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/54/Flare.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const flashlight = await this.partsService.createPart({
      name: 'Flashlight',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/4/4d/Flashlight.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const habitatBuilder = await this.partsService.createPart({
      name: 'Habitat builder',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/5/5c/Habitat_Builder.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const laserCutter = await this.partsService.createPart({
      name: 'Laser cutter',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/3/33/Laser_Cutter.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const pathfinderTool = await this.partsService.createPart({
      name: 'Pathfinder tool',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/1/13/Pathfinder_Tool.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const propulsionCannon = await this.partsService.createPart({
      name: 'Propulsion cannon',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/63/Propulsion_Cannon.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const repairTool = await this.partsService.createPart({
      name: 'Repair tool',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Repair_Tool.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const thermoblade = await this.partsService.createPart({
      name: 'Thermoblade',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/4/4b/Thermoblade.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const scanner = await this.partsService.createPart({
      name: 'Scanner',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/7/78/Scanner.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const survivalKnife = await this.partsService.createPart({
      name: 'Survival knife',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/6/6e/Survival_Knife.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });
    const lightStick = await this.partsService.createPart({
      name: 'Light stick',
      imageUrl:
        'https://static.wikia.nocookie.net/subnautica/images/a/ad/LED_Light.png',
      partCategoryId: partCategoriesSeed.tools.partCategoryId,
    });

    return {
      airBladder,
      flare,
      flashlight,
      habitatBuilder,
      laserCutter,
      pathfinderTool,
      propulsionCannon,
      repairTool,
      thermoblade,
      scanner,
      survivalKnife,
      lightStick,
    };
  }
}
