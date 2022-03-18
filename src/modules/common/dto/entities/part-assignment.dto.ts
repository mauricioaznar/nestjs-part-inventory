import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class PartAssignmentBase {
  @Field({ nullable: false })
  parentId: number;

  @Field({ nullable: false })
  componentId: number;

  @Field({ nullable: false })
  requiredQuantity: number;
}

@InputType('PartAssignmentInput')
export class PartAssignmentInput extends PartAssignmentBase {}

@ObjectType('PartAssignment')
export class PartAssignment extends PartAssignmentBase {}
