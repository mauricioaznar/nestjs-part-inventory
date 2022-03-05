import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';

import { Product } from '../products/products.dto';
import { ProductFeature } from './product-features.dto';
import { ProductFeaturesService } from './product-features.service';
import { ProductFeatureApplicability } from './product-feature-applicabilities.dto';

@Resolver(() => ProductFeatureApplicability)
@Injectable()
export class ProductFeatureApplicabilitiesResolver {
  constructor(private productFeaturesService: ProductFeaturesService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async assignProductToFeature(
    @Args('productFeatureId') productFeatureId: number,
    @Args('productId') productId: number,
  ) {
    return this.productFeaturesService.assignProductToFeature(
      productId,
      productFeatureId,
    );
  }

  @ResolveField(() => ProductFeature)
  async product_feature(
    @Parent() productFeatureApplicability: ProductFeatureApplicability,
  ) {
    return this.productFeaturesService.getProductFeature(
      productFeatureApplicability,
    );
  }

  @ResolveField(() => Product)
  async product(
    @Parent() productFeatureApplicability: ProductFeatureApplicability,
  ) {
    return this.productFeaturesService.getProduct(productFeatureApplicability);
  }
}
