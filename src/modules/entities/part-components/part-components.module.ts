import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { PartComponentsResolver } from './part-components.resolver';
import { PartComponentsService } from './part-components.service';

@Module({
  providers: [PrismaService, PartComponentsResolver, PartComponentsService],
  exports: [PartComponentsResolver],
})
export class PartComponentsModule {}
