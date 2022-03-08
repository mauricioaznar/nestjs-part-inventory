import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { PartCategoriesResolver } from './part-categories.resolver';
import { PartCategoriesService } from './part-categories.service';

@Module({
  providers: [PrismaService, PartCategoriesResolver, PartCategoriesService],
  exports: [PartCategoriesResolver],
})
export class PartCategoriesModule {}
