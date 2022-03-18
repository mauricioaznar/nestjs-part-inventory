import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PartAssignmentInput } from '../../dto/entities/part-assignment.dto';
import { ComponentAssignment } from '../../dto/entities/parts.dto';

@Injectable()
export class PartAssignmentsService {
  constructor(private prisma: PrismaService) {}

  async assignComponent(
    partAssignmentInput: PartAssignmentInput,
  ): Promise<ComponentAssignment> {
    if (!!(await this.hasBeenAssigned(partAssignmentInput))) {
      const parent = await this.prisma.part.findFirst({
        where: {
          partId: partAssignmentInput.parentId,
        },
      });
      const component = await this.prisma.part.findFirst({
        where: {
          partId: partAssignmentInput.componentId,
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
        requiredQuantity: true,
      },
      data: {
        parentId: partAssignmentInput.parentId,
        componentId: partAssignmentInput.componentId,
        requiredQuantity: partAssignmentInput.requiredQuantity,
      },
    });
  }

  private async hasBeenAssigned(
    partAssignmentInput: PartAssignmentInput,
  ): Promise<boolean> {
    const assignment = await this.prisma.partAssignment.findUnique({
      where: {
        parentId_componentId: {
          parentId: partAssignmentInput.parentId,
          componentId: partAssignmentInput.componentId,
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
        parentId: partAssignmentInput.parentId,
      },
    });

    return assignments.length === 4;
  }
}
