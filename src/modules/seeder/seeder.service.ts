import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { User } from '../auth/auth.dto';
import { UserService } from '../auth/user.service';
import { PartCreationService } from './modules/part-creation/part-creation.service';
import { PartAssignmentService } from './modules/part-assignment/part-assignment.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly partCreationService: PartCreationService,
    private readonly partAssignmentService: PartAssignmentService,
  ) {}

  async seed() {
    const user = await this.user();
    const allPartsSeed = await this.partCreationService.createParts();
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
