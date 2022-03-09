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

  async makeAssignmentsForBasicMaterials({
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
}
