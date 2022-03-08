import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartAssignmentBase {
  @Field({ nullable: false })
  parent_id: number;

  @Field({ nullable: false })
  component_id: number;

  @Field({ nullable: false })
  quantity: number;
}

@InputType('PartAssignmentInput')
export class PartAssignmentInput extends PartAssignmentBase {}

@ObjectType('PartAssignment')
export class PartAssignment extends PartAssignmentBase {}
