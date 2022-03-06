import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { PartSubtractionsService } from './part-subtractions.service';
import {
  PartSubtraction,
  PartSubtractionInput,
} from '../../common/dto/entities/part-subtractions.dto';

@Resolver(() => PartSubtraction)
@Injectable()
export class PartSubtractionsResolver {
  constructor(private partSubtractionsService: PartSubtractionsService) {}

  @Mutation(() => PartSubtraction)
  async addSubtraction(
    @Args('partSubtractionInput') input: PartSubtractionInput,
  ) {
    return this.partSubtractionsService.addSubtraction(input);
  }
}
