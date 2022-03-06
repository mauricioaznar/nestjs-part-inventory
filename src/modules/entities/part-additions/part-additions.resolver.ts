import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { PartAdditionsService } from './part-additions.service';
import {
  PartAddition,
  PartAdditionInput,
} from '../../common/dto/entities/part-additions.dto';

@Resolver(() => PartAddition)
@Injectable()
export class PartAdditionsResolver {
  constructor(private partAdditionsService: PartAdditionsService) {}

  @Mutation(() => PartAddition)
  async addAddition(@Args('partComponentInput') input: PartAdditionInput) {
    return this.partAdditionsService.addAddition(input);
  }
}
