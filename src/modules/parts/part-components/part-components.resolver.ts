import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { PartComponentsService } from './part-components.service';
import { PartComponent, PartComponentInput } from './part-components.dto';

@Resolver(() => PartComponent)
@Injectable()
export class PartComponentsResolver {
  constructor(private partComponentsService: PartComponentsService) {}

  @Mutation(() => PartComponent)
  async addComponent(@Args('partComponentInput') input: PartComponentInput) {
    return this.partComponentsService.addComponent(input);
  }
}
