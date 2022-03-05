import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum ProductSubtype {
  Good = 'good',
  Service = 'service',
}

registerEnumType(ProductSubtype, {
  name: 'ProductSubtype',
});

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ProductBase {
  @Field()
  name: string;
}

@InputType('productInput')
export class ProductInput extends ProductBase {
  @Field(() => ProductSubtype)
  product_subtype: ProductSubtype;
}

@ObjectType('Product')
export class Product extends ProductBase {
  @Field({ nullable: false })
  product_id: number;

  @Field({ nullable: true })
  is_good?: boolean;

  @Field({ nullable: true })
  is_service?: boolean;
}
