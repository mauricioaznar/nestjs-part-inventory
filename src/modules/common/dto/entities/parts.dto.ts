import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartBase {
  @Field()
  name: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field({ nullable: false })
  part_category_id: number;

  @Field(() => Int, { nullable: false })
  default_generated_quantity?: number;
}

@InputType('partInput')
export class PartInput extends PartBase {}

@ObjectType('Part')
export class Part extends PartBase {
  @Field({ nullable: false })
  part_id: number;
}

@ObjectType('ComponentAssignment')
export class ComponentAssignment {
  @Field({ nullable: false })
  component: Part;

  @Field({ nullable: false })
  requiredQuantity: number;
}

@ObjectType('ParentAssignment')
export class ParentAssignment {
  @Field({ nullable: false })
  parent: Part;

  @Field({ nullable: false })
  requiredQuantity: number;
}
