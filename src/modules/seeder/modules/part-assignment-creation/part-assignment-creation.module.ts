import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartAssignmentCreationService } from './part-assignment-creation.service';
import { PartAssignmentsService } from '../../../common/services/entities/part-assignments.service';

@Module({
  providers: [
    Logger,
    PrismaService,
    PartAssignmentsService,
    PartAssignmentCreationService,
  ],
  exports: [PartAssignmentCreationService],
})
export class PartAssignmentCreationModule {}
