import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../auth/auth.dto';
import { PartsService } from '../entities/parts/parts.service';
import { PartComponentsService } from '../entities/part-components/part-components.service';
import { PartAdditionsService } from '../entities/part-additions/part-additions.service';
import { PartSubtractionsService } from '../entities/part-subtractions/part-subtractions.service';
import { UserService } from '../auth/user.service';
import { Part } from '../common/dto/entities/parts.dto';

interface PartSeeds {
  copperOre: Part;
  caveSulfur: Part;
  crystallineSulfur: Part;
  diamond: Part;
  gold: Part;
  ionCube: Part;
  kyanite: Part;
  lead: Part;
  lithium: Part;
  magnetite: Part;
  nickelOre: Part;
  quartz: Part;
  ruby: Part;
  saltDeposit: Part;
  silverOre: Part;
  titanium: Part;
  uraniniteCrystal: Part;
  creepvineSample: Part;
  creepvineSeedCluster: Part;
  gelSack: Part;
  tableCoralSample: Part;
}

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
    const parts = await this.parts();
  }

  async user(): Promise<User> {
    return this.userService.create({
      username: 'john',
      password: 'changemeee',
    });
  }

  async parts(): Promise<PartSeeds> {
    const copperOre = await this.partsService.createPart({
      name: 'Copper ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/7/78/Copper_Ore.png',
    });
    const caveSulfur = await this.partsService.createPart({
      name: 'Cave sulfur',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/5d/Cave_Sulfur.png',
    });
    const crystallineSulfur = await this.partsService.createPart({
      name: 'Crystalline sulfur',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Crystalline_Sulfur.png',
    });
    const diamond = await this.partsService.createPart({
      name: 'Diamond',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/ea/Diamond.png',
    });
    const gold = await this.partsService.createPart({
      name: 'Gold',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/1/10/Gold.png',
    });
    const ionCube = await this.partsService.createPart({
      name: 'Ion cube',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/a9/IonCrystalItemNew.png',
    });
    const kyanite = await this.partsService.createPart({
      name: 'Kyanite',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/e4/Kyanite.png',
    });
    const lead = await this.partsService.createPart({
      name: 'Lead',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/e/e8/Lead.png',
    });
    const lithium = await this.partsService.createPart({
      name: 'Lithium',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Lithium.png',
    });
    const magnetite = await this.partsService.createPart({
      name: 'Magnetite',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/c8/Magnetite.png',
    });
    const nickelOre = await this.partsService.createPart({
      name: 'Nickel ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/f/f3/Nickel_Ore.png',
    });
    const quartz = await this.partsService.createPart({
      name: 'Quarz',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cf/Quartz.png',
    });
    const ruby = await this.partsService.createPart({
      name: 'Ruby',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/b/b8/Aluminum_Oxide_Crystal.png',
    });
    const saltDeposit = await this.partsService.createPart({
      name: 'Salt deposit',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/4/4c/Salt_Deposit.png',
    });
    const silverOre = await this.partsService.createPart({
      name: 'Silver ore',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/9/97/Silver_Ore.png',
    });
    const titanium = await this.partsService.createPart({
      name: 'Titanium',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/c/cc/Titanium.png',
    });
    const uraniniteCrystal = await this.partsService.createPart({
      name: 'Uraninite crystal',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/5/51/Uraninite_Crystal.png',
    });
    const creepvineSample = await this.partsService.createPart({
      name: 'Creepvine sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/6/65/Creepvine_Sample.png',
    });
    const creepvineSeedCluster = await this.partsService.createPart({
      name: 'Creepvine seed cluster',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0c/Creepvine_Seed_Cluster.png',
    });
    const gelSack = await this.partsService.createPart({
      name: 'Gel sack',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/a/a3/Gel_Sack_Seed.png',
    });
    const tableCoralSample = await this.partsService.createPart({
      name: 'Table coral sample',
      image_url:
        'https://static.wikia.nocookie.net/subnautica/images/0/0a/Table_Coral_Sample.png',
    });

    return {
      copperOre,
      caveSulfur,
      crystallineSulfur,
      diamond,
      gold,
      ionCube,
      kyanite,
      lead,
      lithium,
      magnetite,
      nickelOre,
      quartz,
      ruby,
      saltDeposit,
      silverOre,
      titanium,
      uraniniteCrystal,
      creepvineSample,
      creepvineSeedCluster,
      gelSack,
      tableCoralSample,
    };
  }
}
