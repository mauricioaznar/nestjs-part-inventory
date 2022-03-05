import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ProductCategoryBase {
  @Field()
  description: string;
}

@InputType('productCategoryInput')
export class ProductCategoryInput extends ProductCategoryBase {}

@ObjectType('ProductCategory')
export class ProductCategory extends ProductCategoryBase {
  @Field({ nullable: false })
  product_category_id: number;
}
