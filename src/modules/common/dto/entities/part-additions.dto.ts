import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartAdditionBase {
  @Field({ nullable: false })
  partId: number;

  @Field({ nullable: false })
  quantity: number;
}

@InputType('partAdditionInput')
export class PartAdditionInput extends PartAdditionBase {}

@ObjectType('PartAddition')
export class PartAddition extends PartAdditionBase {}
