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
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/78/Copper_Ore.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const caveSulfur = await this.partsService.createPart({
      name: 'Cave sulfur',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/5d/Cave_Sulfur.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const crystallineSulfur = await this.partsService.createPart({
      name: 'Crystalline sulfur',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Crystalline_Sulfur.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const diamond = await this.partsService.createPart({
      name: 'Diamond',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Diamond.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const gold = await this.partsService.createPart({
      name: 'Gold',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/10/Gold.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const ionCube = await this.partsService.createPart({
      name: 'Ion cube',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/a9/IonCrystalItemNew.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const kyanite = await this.partsService.createPart({
      name: 'Kyanite',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/e4/Kyanite.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const lead = await this.partsService.createPart({
      name: 'Lead',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/e8/Lead.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const lithium = await this.partsService.createPart({
      name: 'Lithium',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Lithium.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const magnetite = await this.partsService.createPart({
      name: 'Magnetite',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/c8/Magnetite.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const nickelOre = await this.partsService.createPart({
      name: 'Nickel ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/f3/Nickel_Ore.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const quartz = await this.partsService.createPart({
      name: 'Quarz',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Quartz.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const ruby = await this.partsService.createPart({
      name: 'Ruby',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/b/b8/Aluminum_Oxide_Crystal.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const saltDeposit = await this.partsService.createPart({
      name: 'Salt deposit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/4c/Salt_Deposit.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const silverOre = await this.partsService.createPart({
      name: 'Silver ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/97/Silver_Ore.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const titanium = await this.partsService.createPart({
      name: 'Titanium',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cc/Titanium.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const uraniniteCrystal = await this.partsService.createPart({
      name: 'Uraninite crystal',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/51/Uraninite_Crystal.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const creepvineSample = await this.partsService.createPart({
      name: 'Creepvine sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/65/Creepvine_Sample.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const creepvineSeedCluster = await this.partsService.createPart({
      name: 'Creepvine seed cluster',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0c/Creepvine_Seed_Cluster.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const coralTubeSample = await this.partsService.createPart({
      name: 'Coral tube sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/3/3f/Coral_Tube_Sample.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const gelSack = await this.partsService.createPart({
      name: 'Gel sack',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/a3/Gel_Sack_Seed.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const tableCoralSample = await this.partsService.createPart({
      name: 'Table coral sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0a/Table_Coral_Sample.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
    });
    const stalkerTeeth = await this.partsService.createPart({
      name: 'Stalker teeth',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/94/Stalker_Tooth.png',
      part_category_id: partCategoriesSeed.rawMaterials.part_category_id,
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

  private async createBasicMaterials(
    partCategoriesSeed: PartCategoriesSeed,
  ): Promise<BasicMaterialsSeed> {
    const bleach = await this.partsService.createPart({
      name: 'Bleach',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Bleach.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const enameledGlass = await this.partsService.createPart({
      name: 'Enameled glass',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/14/Enameled_Glass.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const fiberMesh = await this.partsService.createPart({
      name: 'Fiber mesh',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/fa/Fiber_Mesh.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const glass = await this.partsService.createPart({
      name: 'Glass',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/15/Glass.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const lubricant = await this.partsService.createPart({
      name: 'Lubricant',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/77/Lubricant.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const plasteelIngot = await this.partsService.createPart({
      name: 'Plasteel ingot',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/fc/Plasteel_Ingot.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const siliconeRubber = await this.partsService.createPart({
      name: 'Silicon rubber',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/d/d0/Silicone_Rubber.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
    });
    const titaniumIngot = await this.partsService.createPart({
      name: 'Titanium ingot',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/61/Titanium_Ingot.png',
      part_category_id: partCategoriesSeed.basicMaterials.part_category_id,
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
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/6d/Battery.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
    });
    const computerChip = await this.partsService.createPart({
      name: 'Computer chip',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/6f/Computer_Chip.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
    });
    const copperWire = await this.partsService.createPart({
      name: 'Copper wire',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/43/Copper_Wire.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
    });
    const ionBattery = await this.partsService.createPart({
      name: 'Ion battery',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/9d/Ion_Battery.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
    });
    const powerCell = await this.partsService.createPart({
      name: 'Power cell',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/9a/Power_Cell.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
    });
    const wiringKit = await this.partsService.createPart({
      name: 'Wiring kit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/7b/Wiring_Kit.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
    });
    const advancedWiringKit = await this.partsService.createPart({
      name: 'Advanced wiring kit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Advanced_Wiring_Kit.png',
      part_category_id: partCategoriesSeed.electronics.part_category_id,
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
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/66/Aerogel.png',
      part_category_id: partCategoriesSeed.advancedMaterials.part_category_id,
    });
    const benzene = await this.partsService.createPart({
      name: 'Benzene',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/9b/Benzene.png',
      part_category_id: partCategoriesSeed.advancedMaterials.part_category_id,
    });
    const hydraulicFluid = await this.partsService.createPart({
      name: 'Hydraulic fluid',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/3/3d/Hydraulic_Fluid_Icon.png',
      part_category_id: partCategoriesSeed.advancedMaterials.part_category_id,
    });
    const hydrochloricAcid = await this.partsService.createPart({
      name: 'Hydrochloric acid',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/9a/Hydrochloric_Acid.png',
      part_category_id: partCategoriesSeed.advancedMaterials.part_category_id,
    });
    const polyaniline = await this.partsService.createPart({
      name: 'Polyaniline',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/8/82/Polyaniline.png',
      part_category_id: partCategoriesSeed.advancedMaterials.part_category_id,
    });
    const syntheticFibers = await this.partsService.createPart({
      name: 'Synthetic fibers',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/8/86/Synthetic_Fibers.png',
      part_category_id: partCategoriesSeed.advancedMaterials.part_category_id,
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
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/b/b3/Beacon.png',
      part_category_id: partCategoriesSeed.deployables.part_category_id,
    });
    const gravTrap = await this.partsService.createPart({
      name: 'Grav trap',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/5d/Grav_Trap.png',
      part_category_id: partCategoriesSeed.deployables.part_category_id,
    });
    const mobileVehicleBay = await this.partsService.createPart({
      name: 'Mobile vehicle bay',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/3/30/Mobile_Vehicle_Bay.png',
      part_category_id: partCategoriesSeed.deployables.part_category_id,
    });
    const seaglide = await this.partsService.createPart({
      name: 'Seaglide',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/6a/Seaglide.png',
      part_category_id: partCategoriesSeed.deployables.part_category_id,
    });
    const waterproofLocker = await this.partsService.createPart({
      name: 'Waterproof locker',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Waterproof_Locker.png',
      part_category_id: partCategoriesSeed.deployables.part_category_id,
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
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/92/Compass.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });
    const fins = await this.partsService.createPart({
      name: 'Fins',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/ce/Fins.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });
    const fireExtinguisher = await this.partsService.createPart({
      name: 'Fire extinguisher',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0a/Fire_Extinguisher.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });
    const firstAidKit = await this.partsService.createPart({
      name: 'First aid kit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/50/First_Aid_Kit.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });
    const headlamp = await this.partsService.createPart({
      name: 'Head lamp',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/5e/Headlamp_Icon.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });

    const highCapacityO2Tank = await this.partsService.createPart({
      name: 'High capacity tank',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/b/b1/High_Capacity_Tank.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });

    const lightweightHighCapacityTank = await this.partsService.createPart({
      name: 'High capacity tank',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/8/81/Plasteel_Tank.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });

    const radiationSuit = await this.partsService.createPart({
      name: 'Radiation suit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/3/3f/Radiation_Suit.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });

    const rebreather = await this.partsService.createPart({
      name: 'Rebreather',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/b/bb/Rebreather.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });

    const standardO2Tank = await this.partsService.createPart({
      name: 'Standard tank',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cb/Standard_O%E2%82%82_Tank.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
    });

    const ultraHighCapacityTank = await this.partsService.createPart({
      name: 'Ultra high capacity tank',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ee/Ultra_High_Capacity_Tank.png',
      part_category_id: partCategoriesSeed.equipments.part_category_id,
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
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/8/86/Air_Bladder.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const flare = await this.partsService.createPart({
      name: 'Flare',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/54/Flare.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const flashlight = await this.partsService.createPart({
      name: 'Flashlight',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/4d/Flashlight.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const habitatBuilder = await this.partsService.createPart({
      name: 'Habitat builder',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/5c/Habitat_Builder.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const laserCutter = await this.partsService.createPart({
      name: 'Laser cutter',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/3/33/Laser_Cutter.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const pathfinderTool = await this.partsService.createPart({
      name: 'Pathfinder tool',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/13/Pathfinder_Tool.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const propulsionCannon = await this.partsService.createPart({
      name: 'Propulsion cannon',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/63/Propulsion_Cannon.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const repairTool = await this.partsService.createPart({
      name: 'Repair tool',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Repair_Tool.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const thermoblade = await this.partsService.createPart({
      name: 'Thermoblade',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/4b/Thermoblade.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const scanner = await this.partsService.createPart({
      name: 'Scanner',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/78/Scanner.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const survivalKnife = await this.partsService.createPart({
      name: 'Survival knife',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/6e/Survival_Knife.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
    });
    const lightStick = await this.partsService.createPart({
      name: 'Light stick',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/ad/LED_Light.png',
      part_category_id: partCategoriesSeed.tools.part_category_id,
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
