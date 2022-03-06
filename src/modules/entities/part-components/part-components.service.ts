import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import {
  PartComponent,
  PartComponentInput,
} from '../../common/dto/entities/part-components.dto';
import { Part } from '../../common/dto/entities/parts.dto';

@Injectable()
export class PartComponentsService {
  constructor(private prisma: PrismaService) {}

  async addComponent(
    partComponentInput: PartComponentInput,
  ): Promise<PartComponent> {
    return this.prisma.partComponent.create({
      data: {
        parent_id: partComponentInput.parent_id,
        component_id: partComponentInput.component_id,
        quantity: partComponentInput.quantity,
      },
    });
  }
}
