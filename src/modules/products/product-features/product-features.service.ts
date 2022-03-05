import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { ProductFeature, ProductFeatureInput } from './product-features.dto';
import { ProductFeatureApplicability } from './product-feature-applicabilities.dto';
import { Product } from '../products/products.dto';

@Injectable()
export class ProductFeaturesService {
  constructor(private prisma: PrismaService) {}

  async createProductFeatureService(input: ProductFeatureInput) {
    return this.prisma.productFeature.create({
      data: {
        description: input.description,
      },
    });
  }

  async assignProductToFeature(
    productId: number,
    productFeatureId: number,
  ): Promise<boolean> {
    const result = await this.prisma.productFeatureApplicability.create({
      data: {
        product_id: productId,
        product_feature_id: productFeatureId,
        from_date: new Date(),
      },
    });
    return !!result;
  }

  async getProductFeature(
    input: ProductFeatureApplicability,
  ): Promise<ProductFeature> {
    return this.prisma.productFeature.findFirst({
      where: {
        product_feature_id: input.product_feature_id,
      },
    });
  }

  async getProduct(input: ProductFeatureApplicability): Promise<Product> {
    return this.prisma.product.findFirst({
      where: {
        product_id: input.product_id,
      },
    });
  }
}
