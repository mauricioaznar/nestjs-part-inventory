import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../auth/auth.dto';
import { PartsService } from '../parts/parts/parts.service';
import { PartComponentsService } from '../parts/part-components/part-components.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly partsService: PartsService,
    private readonly partComponentsService: PartComponentsService,
  ) {}

  async seed() {
    const user = await this.user();
    const titanium = await this.partsService.createPart({
      name: 'Titanium',
    });
    const copperOre = await this.partsService.createPart({
      name: 'Copper ore',
    });
    const barbedWire = await this.partsService.createPart({
      name: 'Barbed wire',
    });
    await this.partComponentsService.addComponent({
      parent_id: barbedWire.part_id,
      component_id: copperOre.part_id,
      quantity: 2,
    });
  }

  async user(): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: 'john',
        password:
          '$2b$10$ILmoZIpCOILGmUC0g4emheQpBakyG854wlnooc0hgLIssZuem1q4.',
      },
    });
  }
}
