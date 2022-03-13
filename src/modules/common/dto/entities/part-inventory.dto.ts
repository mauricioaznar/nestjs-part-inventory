import { Field, InputType } from '@nestjs/graphql';

@InputType('CraftInput')
export class CraftInput {
  @Field({ nullable: false })
  part_id: number;

  @Field({ nullable: false })
  quantity: number;
}

@InputType('FarmInput')
export class FarmInput {
  @Field({ nullable: false })
  part_id: number;

  @Field({ nullable: false })
  quantity: number;
}
