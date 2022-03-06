import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import {
  PartAddition,
  PartAdditionInput,
} from '../../common/dto/entities/part-additions.dto';

@Injectable()
export class PartAdditionsService {
  constructor(private prisma: PrismaService) {}

  async addAddition(
    partAdditionInput: PartAdditionInput,
  ): Promise<PartAddition> {
    return this.prisma.partAddition.create({
      data: {
        part_id: partAdditionInput.part_id,
        quantity: partAdditionInput.quantity,
      },
    });
  }
}
