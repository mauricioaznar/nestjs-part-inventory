import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../auth/auth.dto';
import { Product, ProductSubtype } from '../products/products/products.dto';
import { ProductsService } from '../products/products/products.service';
import { ProductCategory } from '../products/product-categories/product-categories.dto';
import { ProductCategoriesService } from '../products/product-categories/product-categories.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly productService: ProductsService,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}
  async seed() {
    await this.user();
    const products = await this.products();
    const productCategories = await this.productCategories();
    await this.productCategoriesService.assignProductToProductCategory(
      products[0].product_id,
      productCategories[0].product_category_id,
    );
    await this.productCategoriesService.assignProductToProductCategory(
      products[0].product_id,
      productCategories[1].product_category_id,
    );
  }

  async user(): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: 'john',
        password:
          '$2b$10$ILmoZIpCOILGmUC0g4emheQpBakyG854wlnooc0hgLIssZuem1q4.',
      },
    });
  }

  async products(): Promise<readonly [Product, Product]> {
    const product1 = await this.productService.createProduct({
      product_subtype: ProductSubtype.Good,
      name: 'Machine connector',
    });
    const product2 = await this.productService.createProduct({
      product_subtype: ProductSubtype.Good,
      name: 'Machine display screen',
    });

    return [product1, product2] as const;
  }

  async productCategories(): Promise<
    readonly [ProductCategory, ProductCategory]
  > {
    const productCategory1 =
      await this.productCategoriesService.createProductCategory({
        description: 'Category 1',
      });
    const productCategory2 =
      await this.productCategoriesService.createProductCategory({
        description: 'Category 2',
      });

    return [productCategory1, productCategory2] as const;
  }
}
