import { Module } from '@nestjs/common';
import { PartsModule } from './parts/parts.module';
import { PartComponentsModule } from './part-components/part-components.module';
import { PartAdditionsModule } from './part-additions/part-additions.module';
import { PartSubtractionsModule } from './part-subtractions/part-subtractions.module';

@Module({
  imports: [
    PartsModule,
    PartComponentsModule,
    PartAdditionsModule,
    PartSubtractionsModule,
  ],
})
export class EntitiesModule {}
