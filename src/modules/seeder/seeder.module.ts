import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { PartsService } from '../parts/parts/parts.service';
import { PartComponentsService } from '../parts/part-components/part-components.service';

@Module({
  providers: [
    Logger,
    SeederService,
    PrismaService,
    PartsService,
    PartComponentsService,
  ],
})
export class SeederModule {}
