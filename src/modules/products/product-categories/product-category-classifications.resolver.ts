import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoryClassification } from './product-category-classifications.dto';
import { ProductCategory } from './product-categories.dto';
import { Product } from '../products/products.dto';

@Resolver(() => ProductCategoryClassification)
@Injectable()
export class ProductCategoryClassificationsResolver {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async assignProductToCategory(
    @Args('productCategoryId') productCategoryId: number,
    @Args('productId') productId: number,
  ) {
    return this.productCategoriesService.assignProductToProductCategory(
      productId,
      productCategoryId,
    );
  }

  @ResolveField(() => ProductCategory)
  async product_category(
    @Parent() productCategoryClassification: ProductCategoryClassification,
  ) {
    return this.productCategoriesService.getProductCategory(
      productCategoryClassification,
    );
  }

  @ResolveField(() => Product)
  async product(
    @Parent() productCategoryClassification: ProductCategoryClassification,
  ) {
    return this.productCategoriesService.getProduct(
      productCategoryClassification,
    );
  }
}
