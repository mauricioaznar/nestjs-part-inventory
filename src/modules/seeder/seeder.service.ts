import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../common/dto/entities/auth.dto';
import { UserService } from '../auth/user.service';
import { PartCreationService } from './modules/part-creation/part-creation.service';
import { PartAssignmentCreationService } from './modules/part-assignment-creation/part-assignment-creation.service';
import { PartCategoryCreationService } from './modules/part-category-creation/part-category-creation.service';
import { adminUser } from '../common/__tests__/objects/users';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly partCreationService: PartCreationService,
    private readonly partAssignmentService: PartAssignmentCreationService,
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
      username: adminUser.username,
      password: adminUser.password,
    });
  }
}
