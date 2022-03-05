import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ProductCategoryClassificationBase {}

@InputType('productCategoryClassificationInput')
export class ProductCategoryClassificationInput extends ProductCategoryClassificationBase {}

@ObjectType('ProductCategoryClassification')
export class ProductCategoryClassification extends ProductCategoryClassificationBase {
  @Field({ nullable: false })
  product_category_id: number;

  @Field({ nullable: false })
  product_id: number;

  @Field()
  from_date: string;
}
