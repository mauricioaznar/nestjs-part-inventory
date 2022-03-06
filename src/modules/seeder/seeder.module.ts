import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { PartsService } from '../entities/parts/parts.service';
import { PartComponentsService } from '../entities/part-components/part-components.service';
import { PartAdditionsService } from '../entities/part-additions/part-additions.service';
import { PartSubtractionsService } from '../entities/part-subtractions/part-subtractions.service';

@Module({
  providers: [
    Logger,
    SeederService,
    PrismaService,
    PartsService,
    PartComponentsService,
    PartAdditionsService,
    PartSubtractionsService,
  ],
})
export class SeederModule {}
