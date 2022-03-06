import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { PartAdditionsResolver } from './part-additions.resolver';
import { PartAdditionsService } from './part-additions.service';

@Module({
  providers: [PrismaService, PartAdditionsResolver, PartAdditionsService],
  exports: [PartAdditionsResolver],
})
export class PartAdditionsModule {}
