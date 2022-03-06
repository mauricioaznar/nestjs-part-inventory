import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartComponentBase {
  @Field({ nullable: false })
  parent_id: number;

  @Field({ nullable: false })
  component_id: number;

  @Field({ nullable: false })
  quantity: number;
}

@InputType('partComponentInput')
export class PartComponentInput extends PartComponentBase {}

@ObjectType('PartComponent')
export class PartComponent extends PartComponentBase {}
