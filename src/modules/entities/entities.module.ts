import { Module } from '@nestjs/common';
import { PartsModule } from './parts/parts.module';
import { PartAdditionsModule } from './part-additions/part-additions.module';
import { PartSubtractionsModule } from './part-subtractions/part-subtractions.module';
import { PartComponentsModule } from './part-components/part-components.module';
import { PartCategoriesModule } from './part-categories/part-categories.module';

@Module({
  imports: [
    PartsModule,
    PartAdditionsModule,
    PartSubtractionsModule,
    PartComponentsModule,
    PartCategoriesModule,
  ],
})
export class EntitiesModule {}
