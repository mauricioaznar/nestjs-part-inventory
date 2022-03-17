import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PartAssignmentInput } from '../../dto/entities/part-assignment.dto';
import { Component } from '../../dto/entities/parts.dto';

@Injectable()
export class PartAssignmentsService {
  constructor(private prisma: PrismaService) {}

  async assignComponent(
    partAssignmentInput: PartAssignmentInput,
  ): Promise<Component> {
    if (!!(await this.hasBeenAssigned(partAssignmentInput))) {
      const parent = await this.prisma.part.findFirst({
        where: {
          part_id: partAssignmentInput.parent_id,
        },
      });
      const component = await this.prisma.part.findFirst({
        where: {
          part_id: partAssignmentInput.component_id,
        },
      });
      throw new BadRequestException(
        `${parent.name} has been already assigned to ${component.name}.`,
      );
    }

    if (!!(await this.hasMaxComponentAssignment(partAssignmentInput))) {
      throw new BadRequestException(`Max component assignment reached`);
    }

    return this.prisma.partAssignment.create({
      select: {
        component: true,
        required_quantity: true,
      },
      data: {
        parent_id: partAssignmentInput.parent_id,
        component_id: partAssignmentInput.component_id,
        required_quantity: partAssignmentInput.required_quantity,
      },
    });
  }

  private async hasBeenAssigned(
    partAssignmentInput: PartAssignmentInput,
  ): Promise<boolean> {
    const assignment = await this.prisma.partAssignment.findUnique({
      where: {
        parent_id_component_id: {
          parent_id: partAssignmentInput.parent_id,
          component_id: partAssignmentInput.component_id,
        },
      },
    });

    return !!assignment;
  }

  private async hasMaxComponentAssignment(
    partAssignmentInput: PartAssignmentInput,
  ): Promise<boolean> {
    const assignments = await this.prisma.partAssignment.findMany({
      where: {
        parent_id: partAssignmentInput.parent_id,
      },
    });

    return assignments.length === 4;
  }
}
