import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { ProductFeature, ProductFeatureInput } from './product-features.dto';
import { ProductFeaturesService } from './product-features.service';

@Resolver(() => ProductFeature)
@Injectable()
export class ProductFeaturesResolver {
  constructor(private productFeaturesService: ProductFeaturesService) {}

  @Mutation(() => ProductFeature)
  @UseGuards(GqlAuthGuard)
  async createProductFeature(
    @Args('productFeatureInput') input: ProductFeatureInput,
  ) {
    return this.productFeaturesService.createProductFeatureService(input);
  }
}
