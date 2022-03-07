import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartComponentsService } from '../../../entities/part-components/part-components.service';
import { AllPartsSeed } from '../types/all-parts-seed';

@Injectable()
export class PartAssignmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly partComponentsService: PartComponentsService,
  ) {}

  async makeAssignmentsForBasicMaterials({
    rawMaterials,
    basicMaterials,
  }: AllPartsSeed): Promise<void> {
    // bleach
    await this.partComponentsService.addComponent({
      parent_id: basicMaterials.bleach.part_id,
      component_id: rawMaterials.saltDeposit.part_id,
      quantity: 1,
    });
    await this.partComponentsService.addComponent({
      parent_id: basicMaterials.bleach.part_id,
      component_id: rawMaterials.coralTubeSample.part_id,
      quantity: 1,
    });

    // enameled glass
    await this.partComponentsService.addComponent({
      parent_id: basicMaterials.enameledGlass.part_id,
      component_id: rawMaterials.stalkerTeeth.part_id,
      quantity: 1,
    });
    await this.partComponentsService.addComponent({
      parent_id: basicMaterials.enameledGlass.part_id,
      component_id: basicMaterials.glass.part_id,
      quantity: 1,
    });

    // fiber mesh
    await this.partComponentsService.addComponent({
      parent_id: basicMaterials.fiberMesh.part_id,
      component_id: rawMaterials.creepvineSample.part_id,
      quantity: 2,
    });
  }
}
