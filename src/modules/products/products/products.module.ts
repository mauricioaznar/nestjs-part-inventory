import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
  providers: [ProductsResolver, PrismaService, ProductsService],
  exports: [ProductsResolver],
})
export class ProductsModule {}
