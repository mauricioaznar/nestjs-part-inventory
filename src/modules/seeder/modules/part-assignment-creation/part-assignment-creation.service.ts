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
  }

  private async makeAssignmentsForBasicMaterials({
    rawMaterials,
    basicMaterials,
  }: AllPartsSeed): Promise<void> {
    // bleach
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.bleach.part_id,
      component_id: rawMaterials.saltDeposit.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.bleach.part_id,
      component_id: rawMaterials.coralTubeSample.part_id,
      required_quantity: 1,
    });

    // enameled glass
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.enameledGlass.part_id,
      component_id: rawMaterials.stalkerTeeth.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.enameledGlass.part_id,
      component_id: basicMaterials.glass.part_id,
      required_quantity: 1,
    });

    // fiber mesh
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.fiberMesh.part_id,
      component_id: rawMaterials.creepvineSample.part_id,
      required_quantity: 2,
    });

    // glass
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.glass.part_id,
      component_id: rawMaterials.quartz.part_id,
      required_quantity: 2,
    });

    // lubricant
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.lubricant.part_id,
      component_id: rawMaterials.creepvineSeedCluster.part_id,
      required_quantity: 1,
    });

    // plasteel ingot
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.plasteelIngot.part_id,
      component_id: basicMaterials.titaniumIngot.part_id,
      required_quantity: 1,
    });

    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.plasteelIngot.part_id,
      component_id: rawMaterials.lithium.part_id,
      required_quantity: 2,
    });

    // silicon rubber
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.siliconeRubber.part_id,
      component_id: rawMaterials.creepvineSeedCluster.part_id,
      required_quantity: 1,
    });

    // titanium ingot
    await this.partAssignmentService.assignComponent({
      parent_id: basicMaterials.titaniumIngot.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 10,
    });
  }

  private async makeAssignmentsForAdvancedMaterials({
    rawMaterials,
    basicMaterials,
    advancedMaterials,
  }: AllPartsSeed): Promise<void> {
    // aerogel
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.aerogel.part_id,
      component_id: rawMaterials.gelSack.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.aerogel.part_id,
      component_id: rawMaterials.ruby.part_id,
      required_quantity: 1,
    });

    // benzene
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.benzene.part_id,
      component_id: rawMaterials.bloodOil.part_id,
      required_quantity: 3,
    });

    // hydraulic fluid
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.hydraulicFluid.part_id,
      component_id: rawMaterials.creepvineSeedCluster.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.hydraulicFluid.part_id,
      component_id: rawMaterials.gelSack.part_id,
      required_quantity: 4,
    });

    // hydrochloric acid
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.hydrochloricAcid.part_id,
      component_id: rawMaterials.deepShroom.part_id,
      required_quantity: 3,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.hydrochloricAcid.part_id,
      component_id: rawMaterials.saltDeposit.part_id,
      required_quantity: 1,
    });

    // polyaniline
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.polyaniline.part_id,
      component_id: advancedMaterials.hydrochloricAcid.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.polyaniline.part_id,
      component_id: rawMaterials.gold.part_id,
      required_quantity: 1,
    });

    // synthetic fibers
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.syntheticFibers.part_id,
      component_id: advancedMaterials.benzene.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: advancedMaterials.syntheticFibers.part_id,
      component_id: basicMaterials.fiberMesh.part_id,
      required_quantity: 1,
    });
  }

  private async makeAssignmentsForElectronics({
    rawMaterials,
    basicMaterials,
    electronics,
  }: AllPartsSeed): Promise<void> {
    // advanced wiring kit
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.advancedWiringKit.part_id,
      component_id: electronics.wiringKit.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.advancedWiringKit.part_id,
      component_id: rawMaterials.gold.part_id,
      required_quantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.advancedWiringKit.part_id,
      component_id: electronics.computerChip.part_id,
      required_quantity: 1,
    });

    // battery
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.battery.part_id,
      component_id: rawMaterials.acidShroom.part_id,
      required_quantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.battery.part_id,
      component_id: rawMaterials.copperOre.part_id,
      required_quantity: 1,
    });

    // computer chip
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.computerChip.part_id,
      component_id: rawMaterials.tableCoralSample.part_id,
      required_quantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.computerChip.part_id,
      component_id: rawMaterials.gold.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.computerChip.part_id,
      component_id: electronics.copperWire.part_id,
      required_quantity: 1,
    });

    // copper wire
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.copperWire.part_id,
      component_id: rawMaterials.copperOre.part_id,
      required_quantity: 2,
    });

    // ion battery
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.ionBattery.part_id,
      component_id: rawMaterials.ionCube.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.ionBattery.part_id,
      component_id: rawMaterials.gold.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.ionBattery.part_id,
      component_id: rawMaterials.silverOre.part_id,
      required_quantity: 1,
    });

    // power cell
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.powerCell.part_id,
      component_id: electronics.battery.part_id,
      required_quantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.powerCell.part_id,
      component_id: basicMaterials.siliconeRubber.part_id,
      required_quantity: 1,
    });

    // wiring kit
    await this.partAssignmentService.assignComponent({
      parent_id: electronics.wiringKit.part_id,
      component_id: rawMaterials.silverOre.part_id,
      required_quantity: 2,
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
      parent_id: deployables.beacon.part_id,
      component_id: rawMaterials.copperOre.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.beacon.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 1,
    });

    // grav trap
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.gravTrap.part_id,
      component_id: electronics.battery.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.gravTrap.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.gravTrap.part_id,
      component_id: rawMaterials.copperOre.part_id,
      required_quantity: 1,
    });

    // mobile vehicle bay
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.mobileVehicleBay.part_id,
      component_id: basicMaterials.titaniumIngot.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.mobileVehicleBay.part_id,
      component_id: basicMaterials.lubricant.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.mobileVehicleBay.part_id,
      component_id: electronics.powerCell.part_id,
      required_quantity: 1,
    });

    // seaglide
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.seaglide.part_id,
      component_id: electronics.battery.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.seaglide.part_id,
      component_id: basicMaterials.lubricant.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.seaglide.part_id,
      component_id: electronics.copperWire.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.seaglide.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 1,
    });

    // waterproof locker
    await this.partAssignmentService.assignComponent({
      parent_id: deployables.waterproofLocker.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 4,
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
      parent_id: equipments.compass.part_id,
      component_id: electronics.copperWire.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.compass.part_id,
      component_id: electronics.wiringKit.part_id,
      required_quantity: 1,
    });

    // fins
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.fins.part_id,
      component_id: basicMaterials.siliconeRubber.part_id,
      required_quantity: 2,
    });

    // fire extinguisher
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.fireExtinguisher.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 3,
    });

    // first aid
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.firstAidKit.part_id,
      component_id: basicMaterials.fiberMesh.part_id,
      required_quantity: 1,
    });

    // head lamp
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.headlamp.part_id,
      component_id: electronics.ionBattery.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.headlamp.part_id,
      component_id: basicMaterials.glass.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.headlamp.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 1,
    });

    // high capacity tank
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.highCapacityO2Tank.part_id,
      component_id: equipments.standardO2Tank.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.highCapacityO2Tank.part_id,
      component_id: basicMaterials.glass.part_id,
      required_quantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.highCapacityO2Tank.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 4,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.highCapacityO2Tank.part_id,
      component_id: rawMaterials.silverOre.part_id,
      required_quantity: 1,
    });

    // lightweight high capacity tank
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.lightweightHighCapacityTank.part_id,
      component_id: equipments.highCapacityO2Tank.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.lightweightHighCapacityTank.part_id,
      component_id: basicMaterials.plasteelIngot.part_id,
      required_quantity: 1,
    });

    // radiation suit
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.radiationSuit.part_id,
      component_id: basicMaterials.fiberMesh.part_id,
      required_quantity: 2,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.radiationSuit.part_id,
      component_id: rawMaterials.lead.part_id,
      required_quantity: 2,
    });

    // rebreather
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.rebreather.part_id,
      component_id: basicMaterials.fiberMesh.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.rebreather.part_id,
      component_id: electronics.wiringKit.part_id,
      required_quantity: 1,
    });

    // standard tank
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.standardO2Tank.part_id,
      component_id: rawMaterials.titanium.part_id,
      required_quantity: 3,
    });

    // ultra high capacity tank
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.ultraHighCapacityTank.part_id,
      component_id: equipments.highCapacityO2Tank.part_id,
      required_quantity: 1,
    });
    await this.partAssignmentService.assignComponent({
      parent_id: equipments.ultraHighCapacityTank.part_id,
      component_id: rawMaterials.lithium.part_id,
      required_quantity: 4,
    });
  }
}
