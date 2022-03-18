import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartSubtractionBase {
  @Field({ nullable: false })
  partId: number;

  @Field({ nullable: false })
  quantity: number;
}

@InputType('partSubtractionInput')
export class PartSubtractionInput extends PartSubtractionBase {}

@ObjectType('PartSubtraction')
export class PartSubtraction extends PartSubtractionBase {}
