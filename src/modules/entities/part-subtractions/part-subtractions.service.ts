import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import {
  PartSubtraction,
  PartSubtractionInput,
} from '../../common/dto/entities/part-subtractions.dto';

@Injectable()
export class PartSubtractionsService {
  constructor(private prisma: PrismaService) {}

  async addSubtraction(
    partSubtractionInput: PartSubtractionInput,
  ): Promise<PartSubtraction> {
    return this.prisma.partSubtraction.create({
      data: {
        part_id: partSubtractionInput.part_id,
        quantity: partSubtractionInput.quantity,
      },
    });
  }
}
