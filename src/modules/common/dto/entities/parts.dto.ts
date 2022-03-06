import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartBase {
  @Field()
  name: string;
}

@InputType('partInput')
export class PartInput extends PartBase {}

@ObjectType('Part')
export class Part extends PartBase {
  @Field({ nullable: false })
  part_id: number;
}

@ObjectType('Component')
export class Component {
  @Field({ nullable: false })
  component: Part;

  @Field({ nullable: false })
  quantity: number;
}
