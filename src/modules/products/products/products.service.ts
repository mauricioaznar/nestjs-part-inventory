import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { Product, ProductInput } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(productInput: ProductInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: productInput.name,
        is_good: productInput.product_subtype === 'good',
        is_service: productInput.product_subtype === 'service',
      },
    });
  }

  async getProduct(productId: number): Promise<Product> {
    return this.prisma.product.findFirst({
      where: {
        product_id: productId,
      },
    });
  }

  async updateProduct(
    id: number,
    productInput: ProductInput,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: {
        product_id: id,
      },
      data: {
        name: productInput.name,
        is_good: productInput.product_subtype === 'good',
        is_service: productInput.product_subtype === 'service',
      },
    });
  }

  async canProductSubtypeChange() {
    return true;
  }

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductCategoriesClassifications(product: Product) {
    return this.prisma.productCategoryClassification.findMany({
      where: {
        product_id: product.product_id,
      },
    });
  }

  async getProductCategories(product: Product) {
    return this.prisma.productCategory.findMany({
      where: {
        products_category_classifications: {
          some: {
            product_id: {
              equals: product.product_id,
            },
          },
        },
      },
    });
  }

  async getProductFeatures(product: Product) {
    return this.prisma.productFeature.findMany({
      where: {
        product_feature_applicabilities: {
          every: {
            product_id: product.product_id,
          },
        },
      },
    });
  }

  async getProductFeatureApplicabilities(product: Product) {
    return this.prisma.productFeatureApplicability.findMany({
      where: {
        product_id: product.product_id,
      },
    });
  }
}
