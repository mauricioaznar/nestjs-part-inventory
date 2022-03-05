import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import {
  ProductCategory,
  ProductCategoryInput,
} from './product-categories.dto';
import { ProductCategoriesService } from './product-categories.service';

@Resolver(() => ProductCategory)
@Injectable()
export class ProductCategoriesResolver {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Mutation(() => ProductCategory)
  @UseGuards(GqlAuthGuard)
  async createProductCategory(
    @Args('productCategoryInput') input: ProductCategoryInput,
  ) {
    return this.productCategoriesService.createProductCategory(input);
  }
}
