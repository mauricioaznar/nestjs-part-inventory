import { Module } from '@nestjs/common';
import { PartsModule } from './parts/parts.module';
import { PartCategoriesModule } from './part-categories/part-categories.module';

@Module({
  imports: [PartsModule, PartCategoriesModule],
})
export class EntitiesModule {}
