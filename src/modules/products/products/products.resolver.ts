import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductInput } from './products.dto';
import { ProductCategoryClassification } from '../product-categories/product-category-classifications.dto';
import { ProductCategory } from '../product-categories/product-categories.dto';
import { ProductFeature } from '../product-features/product-features.dto';
import { ProductFeatureApplicability } from '../product-features/product-feature-applicabilities.dto';

@Resolver(() => Product)
@Injectable()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(@Args('productInput') input: ProductInput) {
    return this.productsService.createProduct(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: number,
    @Args('productInput') input: ProductInput,
  ) {
    const product = await this.productsService.getProduct(id);

    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    if (!(await this.productsService.canProductSubtypeChange())) {
      throw new BadRequestException(
        `product with id \'${id}\' cant change its subtype`,
      );
    }

    return this.productsService.updateProduct(id, input);
  }

  @Query(() => [Product])
  async getProducts() {
    return this.productsService.getProducts();
  }

  @ResolveField(() => [ProductCategoryClassification])
  async product_category_classifications(@Parent() product: Product) {
    const result =
      await this.productsService.getProductCategoriesClassifications(product);
    return result.map((r) => {
      return {
        ...r,
        from_date: new Date(r.from_date).toUTCString(),
      };
    });
  }

  @ResolveField(() => [ProductCategory])
  async product_categories(@Parent() product: Product) {
    return this.productsService.getProductCategories(product);
  }

  @ResolveField(() => [ProductFeature])
  async product_features(@Parent() product: Product) {
    return this.productsService.getProductFeatures(product);
  }

  @ResolveField(() => [ProductFeatureApplicability])
  async product_feature_applicabilities(@Parent() product: Product) {
    return this.productsService.getProductFeatureApplicabilities(product);
  }
}
