import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { PartsService } from './parts.service';
import { PartsResolver } from './parts.resolver';
import { PartInventoryService } from '../../common/services/entities/part-inventory.service';
import { PartAssignmentsService } from '../../common/services/entities/part-assignments.service';

@Module({
  providers: [
    PrismaService,
    PartsResolver,
    PartsService,
    PartInventoryService,
    PartAssignmentsService,
  ],
  exports: [PartsResolver],
})
export class PartsModule {}
