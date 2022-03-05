import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ProductFeatureBase {
  @Field()
  description: string;
}

@InputType('productFeatureInput')
export class ProductFeatureInput extends ProductFeatureBase {}

@ObjectType('ProductFeature')
export class ProductFeature extends ProductFeatureBase {}
