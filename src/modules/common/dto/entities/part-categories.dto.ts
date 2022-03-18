import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartCategoriesBase {
  @Field({ nullable: false })
  name: string;
}

@InputType('partCategoryInput')
export class PartCategoryInput extends PartCategoriesBase {}

@ObjectType('PartCategory')
export class PartCategory extends PartCategoriesBase {
  @Field({ nullable: false })
  partCategoryId: number;
}
