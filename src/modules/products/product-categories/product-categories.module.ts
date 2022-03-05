import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { ProductCategoriesResolver } from './product-categories.resolver';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoryClassificationsResolver } from './product-category-classifications.resolver';

@Module({
  providers: [
    ProductCategoriesResolver,
    ProductCategoryClassificationsResolver,
    PrismaService,
    ProductCategoriesService,
  ],
  exports: [ProductCategoriesResolver, ProductCategoryClassificationsResolver],
})
export class ProductCategoriesModule {}
