import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../auth/auth.dto';
import { PartsService } from '../entities/parts/parts.service';
import { PartComponentsService } from '../entities/part-components/part-components.service';
import { PartAdditionsService } from '../entities/part-additions/part-additions.service';
import { PartSubtractionsService } from '../entities/part-subtractions/part-subtractions.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly partsService: PartsService,
    private readonly partComponentsService: PartComponentsService,
    private readonly partAdditionsService: PartAdditionsService,
    private readonly partSubtractionsService: PartSubtractionsService,
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
    await this.partAdditionsService.addAddition({
      part_id: barbedWire.part_id,
      quantity: 5,
    });
    await this.partSubtractionsService.addSubtraction({
      part_id: barbedWire.part_id,
      quantity: 1,
    });
  }

  async user(): Promise<User> {
    return this.userService.create({
      username: 'john',
      password: 'changemeee',
    });
  }
}
