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
      parentId: basicMaterials.bleach.partId,
      componentId: rawMaterials.saltDeposit.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.bleach.partId,
      componentId: rawMaterials.coralTubeSample.partId,
      requiredQuantity: 1,
    });

    // enameled glass
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.enameledGlass.partId,
      componentId: rawMaterials.stalkerTeeth.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.enameledGlass.partId,
      componentId: basicMaterials.glass.partId,
      requiredQuantity: 1,
    });

    // fiber mesh
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.fiberMesh.partId,
      componentId: rawMaterials.creepvineSample.partId,
      requiredQuantity: 2,
    });

    // glass
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.glass.partId,
      componentId: rawMaterials.quartz.partId,
      requiredQuantity: 2,
    });

    // lubricant
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.lubricant.partId,
      componentId: rawMaterials.creepvineSeedCluster.partId,
      requiredQuantity: 1,
    });

    // plasteel ingot
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.plasteelIngot.partId,
      componentId: basicMaterials.titaniumIngot.partId,
      requiredQuantity: 1,
    });

    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.plasteelIngot.partId,
      componentId: rawMaterials.lithium.partId,
      requiredQuantity: 2,
    });

    // silicon rubber
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.siliconeRubber.partId,
      componentId: rawMaterials.creepvineSeedCluster.partId,
      requiredQuantity: 1,
    });

    // titanium ingot
    await this.partAssignmentService.assignComponent({
      parentId: basicMaterials.titaniumIngot.partId,
      componentId: rawMaterials.titanium.partId,
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
      parentId: advancedMaterials.aerogel.partId,
      componentId: rawMaterials.gelSack.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.aerogel.partId,
      componentId: rawMaterials.ruby.partId,
      requiredQuantity: 1,
    });

    // benzene
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.benzene.partId,
      componentId: rawMaterials.bloodOil.partId,
      requiredQuantity: 3,
    });

    // hydraulic fluid
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydraulicFluid.partId,
      componentId: rawMaterials.creepvineSeedCluster.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydraulicFluid.partId,
      componentId: rawMaterials.gelSack.partId,
      requiredQuantity: 4,
    });

    // hydrochloric acid
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydrochloricAcid.partId,
      componentId: rawMaterials.deepShroom.partId,
      requiredQuantity: 3,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.hydrochloricAcid.partId,
      componentId: rawMaterials.saltDeposit.partId,
      requiredQuantity: 1,
    });

    // polyaniline
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.polyaniline.partId,
      componentId: advancedMaterials.hydrochloricAcid.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.polyaniline.partId,
      componentId: rawMaterials.gold.partId,
      requiredQuantity: 1,
    });

    // synthetic fibers
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.syntheticFibers.partId,
      componentId: advancedMaterials.benzene.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: advancedMaterials.syntheticFibers.partId,
      componentId: basicMaterials.fiberMesh.partId,
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
      parentId: electronics.advancedWiringKit.partId,
      componentId: electronics.wiringKit.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.advancedWiringKit.partId,
      componentId: rawMaterials.gold.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.advancedWiringKit.partId,
      componentId: electronics.computerChip.partId,
      requiredQuantity: 1,
    });

    // battery
    await this.partAssignmentService.assignComponent({
      parentId: electronics.battery.partId,
      componentId: rawMaterials.acidShroom.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.battery.partId,
      componentId: rawMaterials.copperOre.partId,
      requiredQuantity: 1,
    });

    // computer chip
    await this.partAssignmentService.assignComponent({
      parentId: electronics.computerChip.partId,
      componentId: rawMaterials.tableCoralSample.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.computerChip.partId,
      componentId: rawMaterials.gold.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.computerChip.partId,
      componentId: electronics.copperWire.partId,
      requiredQuantity: 1,
    });

    // copper wire
    await this.partAssignmentService.assignComponent({
      parentId: electronics.copperWire.partId,
      componentId: rawMaterials.copperOre.partId,
      requiredQuantity: 2,
    });

    // ion battery
    await this.partAssignmentService.assignComponent({
      parentId: electronics.ionBattery.partId,
      componentId: rawMaterials.ionCube.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.ionBattery.partId,
      componentId: rawMaterials.gold.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.ionBattery.partId,
      componentId: rawMaterials.silverOre.partId,
      requiredQuantity: 1,
    });

    // power cell
    await this.partAssignmentService.assignComponent({
      parentId: electronics.powerCell.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: electronics.powerCell.partId,
      componentId: basicMaterials.siliconeRubber.partId,
      requiredQuantity: 1,
    });

    // wiring kit
    await this.partAssignmentService.assignComponent({
      parentId: electronics.wiringKit.partId,
      componentId: rawMaterials.silverOre.partId,
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
      parentId: deployables.beacon.partId,
      componentId: rawMaterials.copperOre.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.beacon.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });

    // grav trap
    await this.partAssignmentService.assignComponent({
      parentId: deployables.gravTrap.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.gravTrap.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.gravTrap.partId,
      componentId: rawMaterials.copperOre.partId,
      requiredQuantity: 1,
    });

    // mobile vehicle bay
    await this.partAssignmentService.assignComponent({
      parentId: deployables.mobileVehicleBay.partId,
      componentId: basicMaterials.titaniumIngot.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.mobileVehicleBay.partId,
      componentId: basicMaterials.lubricant.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.mobileVehicleBay.partId,
      componentId: electronics.powerCell.partId,
      requiredQuantity: 1,
    });

    // seaglide
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.partId,
      componentId: basicMaterials.lubricant.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.partId,
      componentId: electronics.copperWire.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: deployables.seaglide.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });

    // waterproof locker
    await this.partAssignmentService.assignComponent({
      parentId: deployables.waterproofLocker.partId,
      componentId: rawMaterials.titanium.partId,
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
      parentId: equipments.compass.partId,
      componentId: electronics.copperWire.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.compass.partId,
      componentId: electronics.wiringKit.partId,
      requiredQuantity: 1,
    });

    // fins
    await this.partAssignmentService.assignComponent({
      parentId: equipments.fins.partId,
      componentId: basicMaterials.siliconeRubber.partId,
      requiredQuantity: 2,
    });

    // fire extinguisher
    await this.partAssignmentService.assignComponent({
      parentId: equipments.fireExtinguisher.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 3,
    });

    // first aid
    await this.partAssignmentService.assignComponent({
      parentId: equipments.firstAidKit.partId,
      componentId: basicMaterials.fiberMesh.partId,
      requiredQuantity: 1,
    });

    // head lamp
    await this.partAssignmentService.assignComponent({
      parentId: equipments.headlamp.partId,
      componentId: electronics.ionBattery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.headlamp.partId,
      componentId: basicMaterials.glass.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.headlamp.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });

    // high capacity tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.partId,
      componentId: equipments.standardO2Tank.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.partId,
      componentId: basicMaterials.glass.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 4,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.highCapacityO2Tank.partId,
      componentId: rawMaterials.silverOre.partId,
      requiredQuantity: 1,
    });

    // lightweight high capacity tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.lightweightHighCapacityTank.partId,
      componentId: equipments.highCapacityO2Tank.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.lightweightHighCapacityTank.partId,
      componentId: basicMaterials.plasteelIngot.partId,
      requiredQuantity: 1,
    });

    // radiation suit
    await this.partAssignmentService.assignComponent({
      parentId: equipments.radiationSuit.partId,
      componentId: basicMaterials.fiberMesh.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.radiationSuit.partId,
      componentId: rawMaterials.lead.partId,
      requiredQuantity: 2,
    });

    // rebreather
    await this.partAssignmentService.assignComponent({
      parentId: equipments.rebreather.partId,
      componentId: basicMaterials.fiberMesh.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.rebreather.partId,
      componentId: electronics.wiringKit.partId,
      requiredQuantity: 1,
    });

    // standard tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.standardO2Tank.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 3,
    });

    // ultra high capacity tank
    await this.partAssignmentService.assignComponent({
      parentId: equipments.ultraHighCapacityTank.partId,
      componentId: equipments.highCapacityO2Tank.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: equipments.ultraHighCapacityTank.partId,
      componentId: rawMaterials.lithium.partId,
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
      parentId: tools.airBladder.partId,
      componentId: rawMaterials.bladderfish.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.airBladder.partId,
      componentId: basicMaterials.siliconeRubber.partId,
      requiredQuantity: 1,
    });

    // flare
    await this.partAssignmentService.assignComponent({
      parentId: tools.flare.partId,
      componentId: rawMaterials.caveSulfur.partId,
      requiredQuantity: 1,
    });

    // flashlight
    await this.partAssignmentService.assignComponent({
      parentId: tools.flashlight.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.flashlight.partId,
      componentId: basicMaterials.glass.partId,
      requiredQuantity: 1,
    });

    // habitat builder
    await this.partAssignmentService.assignComponent({
      parentId: tools.habitatBuilder.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.habitatBuilder.partId,
      componentId: electronics.computerChip.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.habitatBuilder.partId,
      componentId: electronics.wiringKit.partId,
      requiredQuantity: 1,
    });

    // laser cutter
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.partId,
      componentId: rawMaterials.diamond.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.laserCutter.partId,
      componentId: rawMaterials.caveSulfur.partId,
      requiredQuantity: 1,
    });

    // light stick
    await this.partAssignmentService.assignComponent({
      parentId: tools.lightStick.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.lightStick.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.lightStick.partId,
      componentId: basicMaterials.glass.partId,
      requiredQuantity: 1,
    });

    // pathfinder tool
    await this.partAssignmentService.assignComponent({
      parentId: tools.pathfinderTool.partId,
      componentId: rawMaterials.creepvineSeedCluster.partId,
      requiredQuantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.pathfinderTool.partId,
      componentId: electronics.copperWire.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.pathfinderTool.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });

    // propulsion cannon
    await this.partAssignmentService.assignComponent({
      parentId: tools.propulsionCannon.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.propulsionCannon.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.propulsionCannon.partId,
      componentId: electronics.wiringKit.partId,
      requiredQuantity: 1,
    });

    // repair tool
    await this.partAssignmentService.assignComponent({
      parentId: tools.repairTool.partId,
      componentId: rawMaterials.caveSulfur.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.repairTool.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.repairTool.partId,
      componentId: basicMaterials.siliconeRubber.partId,
      requiredQuantity: 1,
    });

    // scanner
    await this.partAssignmentService.assignComponent({
      parentId: tools.scanner.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.scanner.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });

    // survival knife
    await this.partAssignmentService.assignComponent({
      parentId: tools.survivalKnife.partId,
      componentId: basicMaterials.siliconeRubber.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.survivalKnife.partId,
      componentId: rawMaterials.titanium.partId,
      requiredQuantity: 1,
    });

    // thermoblade
    await this.partAssignmentService.assignComponent({
      parentId: tools.thermoblade.partId,
      componentId: tools.survivalKnife.partId,
      requiredQuantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parentId: tools.thermoblade.partId,
      componentId: electronics.battery.partId,
      requiredQuantity: 1,
    });
  }
}
