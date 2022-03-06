import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { PartSubtractionsResolver } from './part-subtractions.resolver';
import { PartSubtractionsService } from './part-subtractions.service';

@Module({
  providers: [PrismaService, PartSubtractionsResolver, PartSubtractionsService],
  exports: [PartSubtractionsResolver],
})
export class PartSubtractionsModule {}
