import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { PartsService } from './parts/parts.service';
import { PartsResolver } from './parts/parts.resolver';
import { PartComponentsResolver } from './part-components/part-components.resolver';
import { PartComponentsService } from './part-components/part-components.service';

@Module({
  providers: [
    PrismaService,
    PartsResolver,
    PartComponentsResolver,
    PartsService,
    PartComponentsService,
  ],
  exports: [PartsResolver],
})
export class PartsModule {}
