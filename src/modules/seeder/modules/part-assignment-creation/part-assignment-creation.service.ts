import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartAssignmentsService } from '../../../common/services/entities/part-assignments.service';
import { AllPartsSeed } from '../../types/all-parts-seed';

@Injectable()
export class PartAssignmentCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly partAssignmentService: PartAssignmentsService,
  ) {}

  async makeAssignments(allPartsSeed: AllPartsSeed): Promise<void> {
    await this.makeAssignmentsForBasicMaterials(allPartsSeed);
    await this.makeAssignmentsForAdvancedMaterials(allPartsSeed);
    await this.makeAssignmentsForElectronics(allPartsSeed);
    await this.makeAssignmentsForDeployables(allPartsSeed);
    await this.makeAssignmentsForEquipments(allPartsSeed);
    await this.makeAssignmentsForTools(allPartsSeed);
  }

  private async makeAssignmentsForBasicMaterials({
    rawMaterials,
    basicMaterials,
  }: AllPartsSeed): Promise<void> {
    // bleach
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.bleach.part_id,
      componentId: rawMaterials.saltDeposit.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.bleach.part_id,
      componentId: rawMaterials.coralTubeSample.part_id,
      requiredQuantity: 1,
    });

    // enameled glass
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.enameledGlass.part_id,
      componentId: rawMaterials.stalkerTeeth.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.enameledGlass.part_id,
      componentId: basicMaterials.glass.part_id,
      requiredQuantity: 1,
    });

    // fiber mesh
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.fiberMesh.part_id,
      componentId: rawMaterials.creepvineSample.part_id,
      requiredQuantity: 2,
    });

    // glass
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.glass.part_id,
      componentId: rawMaterials.quartz.part_id,
      requiredQuantity: 2,
    });

    // lubricant
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.lubricant.part_id,
      componentId: rawMaterials.creepvineSeedCluster.part_id,
      requiredQuantity: 1,
    });

    // plasteel ingot
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.plasteelIngot.part_id,
      componentId: basicMaterials.titaniumIngot.part_id,
      requiredQuantity: 1,
    });

    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.plasteelIngot.part_id,
      componentId: rawMaterials.lithium.part_id,
      requiredQuantity: 2,
    });

    // silicon rubber
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.siliconeRubber.part_id,
      componentId: rawMaterials.creepvineSeedCluster.part_id,
      requiredQuantity: 1,
    });

    // titanium ingot
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.titaniumIngot.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 10,
    });
  }

  private async makeAssignmentsForAdvancedMaterials({
    rawMaterials,
    basicMaterials,
    advancedMaterials,
  }: AllPartsSeed): Promise<void> {
    // aerogel
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.aerogel.part_id,
      componentId: rawMaterials.gelSack.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.aerogel.part_id,
      componentId: rawMaterials.ruby.part_id,
      requiredQuantity: 1,
    });

    // benzene
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.benzene.part_id,
      componentId: rawMaterials.bloodOil.part_id,
      requiredQuantity: 3,
    });

    // hydraulic fluid
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydraulicFluid.part_id,
      componentId: rawMaterials.creepvineSeedCluster.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydraulicFluid.part_id,
      componentId: rawMaterials.gelSack.part_id,
      requiredQuantity: 4,
    });

    // hydrochloric acid
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydrochloricAcid.part_id,
      componentId: rawMaterials.deepShroom.part_id,
      requiredQuantity: 3,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydrochloricAcid.part_id,
      componentId: rawMaterials.saltDeposit.part_id,
      requiredQuantity: 1,
    });

    // polyaniline
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.polyaniline.part_id,
      componentId: advancedMaterials.hydrochloricAcid.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.polyaniline.part_id,
      componentId: rawMaterials.gold.part_id,
      requiredQuantity: 1,
    });

    // synthetic fibers
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.syntheticFibers.part_id,
      componentId: advancedMaterials.benzene.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.syntheticFibers.part_id,
      componentId: basicMaterials.fiberMesh.part_id,
      requiredQuantity: 1,
    });
  }

  private async makeAssignmentsForElectronics({
    rawMaterials,
    basicMaterials,
    electronics,
  }: AllPartsSeed): Promise<void> {
    // advanced wiring kit
    await this.partAssignmentService.assignComponent({
      parentId: electronics.advancedWiringKit.part_id,
      componentId: electronics.wiringKit.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.advancedWiringKit.part_id,
      componentId: rawMaterials.gold.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.advancedWiringKit.part_id,
      componentId: electronics.computerChip.part_id,
      requiredQuantity: 1,
    });

    // battery
    await this.partAssignmentService.assignComponent({
      parentId: electronics.battery.part_id,
      componentId: rawMaterials.acidShroom.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.battery.part_id,
      componentId: rawMaterials.copperOre.part_id,
      requiredQuantity: 1,
    });

    // computer chip
    await this.partAssignmentService.assignComponent({
      parentId: electronics.computerChip.part_id,
      componentId: rawMaterials.tableCoralSample.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.computerChip.part_id,
      componentId: rawMaterials.gold.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.computerChip.part_id,
      componentId: electronics.copperWire.part_id,
      requiredQuantity: 1,
    });

    // copper wire
    await this.partAssignmentService.assignComponent({
      parentId: electronics.copperWire.part_id,
      componentId: rawMaterials.copperOre.part_id,
      requiredQuantity: 2,
    });

    // ion battery
    await this.partAssignmentService.assignComponent({
      parentId: electronics.ionBattery.part_id,
      componentId: rawMaterials.ionCube.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.ionBattery.part_id,
      componentId: rawMaterials.gold.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.ionBattery.part_id,
      componentId: rawMaterials.silverOre.part_id,
      requiredQuantity: 1,
    });

    // power cell
    await this.partAssignmentService.assignComponent({
      parentId: electronics.powerCell.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.powerCell.part_id,
      componentId: basicMaterials.siliconeRubber.part_id,
      requiredQuantity: 1,
    });

    // wiring kit
    await this.partAssignmentService.assignComponent({
      parentId: electronics.wiringKit.part_id,
      componentId: rawMaterials.silverOre.part_id,
      requiredQuantity: 2,
    });
  }

  private async makeAssignmentsForDeployables({
    rawMaterials,
    basicMaterials,
    electronics,
    deployables,
  }: AllPartsSeed): Promise<void> {
    // beacon
    await this.partAssignmentService.assignComponent({
      parentId: deployables.beacon.part_id,
      componentId: rawMaterials.copperOre.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.beacon.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });

    // grav trap
    await this.partAssignmentService.assignComponent({
      parentId: deployables.gravTrap.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.gravTrap.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.gravTrap.part_id,
      componentId: rawMaterials.copperOre.part_id,
      requiredQuantity: 1,
    });

    // mobile vehicle bay
    await this.partAssignmentService.assignComponent({
      parentId: deployables.mobileVehicleBay.part_id,
      componentId: basicMaterials.titaniumIngot.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.mobileVehicleBay.part_id,
      componentId: basicMaterials.lubricant.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.mobileVehicleBay.part_id,
      componentId: electronics.powerCell.part_id,
      requiredQuantity: 1,
    });

    // seaglide
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.part_id,
      componentId: basicMaterials.lubricant.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.part_id,
      componentId: electronics.copperWire.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });

    // waterproof locker
    await this.partAssignmentService.assignComponent({
      parentId: deployables.waterproofLocker.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 4,
    });
  }

  private async makeAssignmentsForEquipments({
    rawMaterials,
    basicMaterials,
    electronics,
    equipments,
  }: AllPartsSeed): Promise<void> {
    // compass
    await this.partAssignmentService.assignComponent({
      parentId: equipments.compass.part_id,
      componentId: electronics.copperWire.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.compass.part_id,
      componentId: electronics.wiringKit.part_id,
      requiredQuantity: 1,
    });

    // fins
    await this.partAssignmentService.assignComponent({
      parentId: equipments.fins.part_id,
      componentId: basicMaterials.siliconeRubber.part_id,
      requiredQuantity: 2,
    });

    // fire extinguisher
    await this.partAssignmentService.assignComponent({
      parentId: equipments.fireExtinguisher.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 3,
    });

    // first aid
    await this.partAssignmentService.assignComponent({
      parentId: equipments.firstAidKit.part_id,
      componentId: basicMaterials.fiberMesh.part_id,
      requiredQuantity: 1,
    });

    // head lamp
    await this.partAssignmentService.assignComponent({
      parentId: equipments.headlamp.part_id,
      componentId: electronics.ionBattery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.headlamp.part_id,
      componentId: basicMaterials.glass.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.headlamp.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });

    // high capacity tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.part_id,
      componentId: equipments.standardO2Tank.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.part_id,
      componentId: basicMaterials.glass.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 4,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.part_id,
      componentId: rawMaterials.silverOre.part_id,
      requiredQuantity: 1,
    });

    // lightweight high capacity tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.lightweightHighCapacityTank.part_id,
      componentId: equipments.highCapacityO2Tank.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.lightweightHighCapacityTank.part_id,
      componentId: basicMaterials.plasteelIngot.part_id,
      requiredQuantity: 1,
    });

    // radiation suit
    await this.partAssignmentService.assignComponent({
      parentId: equipments.radiationSuit.part_id,
      componentId: basicMaterials.fiberMesh.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.radiationSuit.part_id,
      componentId: rawMaterials.lead.part_id,
      requiredQuantity: 2,
    });

    // rebreather
    await this.partAssignmentService.assignComponent({
      parentId: equipments.rebreather.part_id,
      componentId: basicMaterials.fiberMesh.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.rebreather.part_id,
      componentId: electronics.wiringKit.part_id,
      requiredQuantity: 1,
    });

    // standard tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.standardO2Tank.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 3,
    });

    // ultra high capacity tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.ultraHighCapacityTank.part_id,
      componentId: equipments.highCapacityO2Tank.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.ultraHighCapacityTank.part_id,
      componentId: rawMaterials.lithium.part_id,
      requiredQuantity: 4,
    });
  }

  private async makeAssignmentsForTools({
    rawMaterials,
    basicMaterials,
    electronics,
    tools,
  }: AllPartsSeed): Promise<void> {
    // air bladder
    await this.partAssignmentService.assignComponent({
      parentId: tools.airBladder.part_id,
      componentId: rawMaterials.bladderfish.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.airBladder.part_id,
      componentId: basicMaterials.siliconeRubber.part_id,
      requiredQuantity: 1,
    });

    // flare
    await this.partAssignmentService.assignComponent({
      parentId: tools.flare.part_id,
      componentId: rawMaterials.caveSulfur.part_id,
      requiredQuantity: 1,
    });

    // flashlight
    await this.partAssignmentService.assignComponent({
      parentId: tools.flashlight.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.flashlight.part_id,
      componentId: basicMaterials.glass.part_id,
      requiredQuantity: 1,
    });

    // habitat builder
    await this.partAssignmentService.assignComponent({
      parentId: tools.habitatBuilder.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.habitatBuilder.part_id,
      componentId: electronics.computerChip.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.habitatBuilder.part_id,
      componentId: electronics.wiringKit.part_id,
      requiredQuantity: 1,
    });

    // laser cutter
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.part_id,
      componentId: rawMaterials.diamond.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.part_id,
      componentId: rawMaterials.caveSulfur.part_id,
      requiredQuantity: 1,
    });

    // light stick
    await this.partAssignmentService.assignComponent({
      parentId: tools.lightStick.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.lightStick.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.lightStick.part_id,
      componentId: basicMaterials.glass.part_id,
      requiredQuantity: 1,
    });

    // pathfinder tool
    await this.partAssignmentService.assignComponent({
      parentId: tools.pathfinderTool.part_id,
      componentId: rawMaterials.creepvineSeedCluster.part_id,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.pathfinderTool.part_id,
      componentId: electronics.copperWire.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.pathfinderTool.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });

    // propulsion cannon
    await this.partAssignmentService.assignComponent({
      parentId: tools.propulsionCannon.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.propulsionCannon.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.propulsionCannon.part_id,
      componentId: electronics.wiringKit.part_id,
      requiredQuantity: 1,
    });

    // repair tool
    await this.partAssignmentService.assignComponent({
      parentId: tools.repairTool.part_id,
      componentId: rawMaterials.caveSulfur.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.repairTool.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.repairTool.part_id,
      componentId: basicMaterials.siliconeRubber.part_id,
      requiredQuantity: 1,
    });

    // scanner
    await this.partAssignmentService.assignComponent({
      parentId: tools.scanner.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.scanner.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });

    // survival knife
    await this.partAssignmentService.assignComponent({
      parentId: tools.survivalKnife.part_id,
      componentId: basicMaterials.siliconeRubber.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.survivalKnife.part_id,
      componentId: rawMaterials.titanium.part_id,
      requiredQuantity: 1,
    });

    // thermoblade
    await this.partAssignmentService.assignComponent({
      parentId: tools.thermoblade.part_id,
      componentId: tools.survivalKnife.part_id,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.thermoblade.part_id,
      componentId: electronics.battery.part_id,
      requiredQuantity: 1,
    });
  }
}
