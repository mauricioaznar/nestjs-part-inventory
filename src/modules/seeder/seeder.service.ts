import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../auth/auth.dto';
import { UserService } from '../auth/user.service';
import { PartCreationService } from './modules/part-creation/part-creation.service';
import { PartAssignmentService } from './modules/part-assignment/part-assignment.service';
import { PartCategoryCreationService } from './modules/part-category-creation/part-category-creation.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly partCreationService: PartCreationService,
    private readonly partAssignmentService: PartAssignmentService,
    private readonly partCategoryCreationService: PartCategoryCreationService,
  ) {}

  async seed() {
    await this.user();
    const partCategoriesSeed =
      await this.partCategoryCreationService.createPartCategories();
    const allPartsSeed = await this.partCreationService.createParts(
      partCategoriesSeed,
    );
    await this.partAssignmentService.makeAssignmentsForBasicMaterials(
      allPartsSeed,
    );
  }

  async user(): Promise<User> {
    return this.userService.create({
      username: 'john',
      password: 'changeme',
    });
  }
}
