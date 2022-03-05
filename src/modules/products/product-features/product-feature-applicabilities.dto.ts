import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ProductFeatureApplicabilityBase {}

@InputType('ProductFeatureApplicabilityInput')
export class ProductFeatureApplicabilityInput extends ProductFeatureApplicabilityBase {}

@ObjectType('ProductFeatureApplicability')
export class ProductFeatureApplicability extends ProductFeatureApplicabilityBase {
  @Field({ nullable: false })
  product_feature_id: number;

  @Field({ nullable: false })
  product_id: number;

  @Field()
  from_date: string;
}
