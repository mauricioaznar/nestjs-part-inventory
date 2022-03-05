import { Module } from '@nestjs/common';
import { ProductFeaturesResolver } from './product-features.resolver';
import { ProductFeaturesService } from './product-features.service';
import { ProductFeatureApplicabilitiesResolver } from './product-feature-applicabilities.resolver';

@Module({
  providers: [
    ProductFeaturesResolver,
    ProductFeaturesService,
    ProductFeatureApplicabilitiesResolver,
  ],
  exports: [ProductFeaturesResolver],
})
export class ProductFeaturesModule {}
