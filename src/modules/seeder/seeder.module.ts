import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { UserService } from '../auth/user.service';
import { PartCreationModule } from './modules/part-creation/part-creation.module';
import { PartAssignmentModule } from './modules/part-assignment/part-assignment.module';
import { PartCategoryCreationModule } from './modules/part-category-creation/part-category-creation.module';

@Module({
  providers: [Logger, SeederService, UserService, PrismaService],
  imports: [
    PartCreationModule,
    PartAssignmentModule,
    PartCategoryCreationModule,
  ],
})
export class SeederModule {}
