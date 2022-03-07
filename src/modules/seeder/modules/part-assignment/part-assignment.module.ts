import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { PartAssignmentService } from './part-assignment.service';
import { PartComponentsService } from '../../../entities/part-components/part-components.service';

@Module({
  providers: [
    Logger,
    PrismaService,
    PartComponentsService,
    PartAssignmentService,
  ],
  exports: [PartAssignmentService],
})
export class PartAssignmentModule {}
