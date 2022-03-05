import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { ProductsService } from '../products/products/products.service';
import { ProductCategoriesService } from '../products/product-categories/product-categories.service';

@Module({
  providers: [
    Logger,
    SeederService,
    PrismaService,
    ProductsService,
    ProductCategoriesService,
  ],
})
export class SeederModule {}
