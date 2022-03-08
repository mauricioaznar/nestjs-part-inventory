import { Logger, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { UserService } from '../auth/user.service';
import { PartCreationModule } from './modules/part-creation/part-creation.module';
import { PartAssignmentCreationModule } from './modules/part-assignment-creation/part-assignment-creation.module';
import { PartCategoryCreationModule } from './modules/part-category-creation/part-category-creation.module';

@Module({
  providers: [Logger, SeederService, UserService, PrismaService],
  imports: [
    PartCreationModule,
    PartAssignmentCreationModule,
    PartCategoryCreationModule,
  ],
})
export class SeederModule {}
