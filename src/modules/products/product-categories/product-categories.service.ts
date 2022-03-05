import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import {
  ProductCategory,
  ProductCategoryInput,
} from './product-categories.dto';
import { ProductCategoryClassification } from './product-category-classifications.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(private prisma: PrismaService) {}

  async createProductCategory(
    productCategoryInput: ProductCategoryInput,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data: {
        description: productCategoryInput.description,
      },
    });
  }

  async assignProductToProductCategory(
    productId: number,
    productCategoryId: number,
  ): Promise<boolean> {
    const newDate = new Date(Date.now() - new Date().getTimezoneOffset());
    console.log(newDate.toISOString());
    console.log(newDate);
    const result = await this.prisma.productCategoryClassification.create({
      data: {
        product_id: productId,
        product_category_id: productCategoryId,
        from_date: newDate,
      },
    });
    return !!result;
  }

  async getProductCategory(input: ProductCategoryClassification) {
    return this.prisma.productCategory.findFirst({
      where: {
        product_category_id: input.product_category_id,
      },
    });
  }

  async getProduct(input: ProductCategoryClassification) {
    return this.prisma.product.findFirst({
      where: {
        product_id: input.product_id,
      },
    });
  }
}
