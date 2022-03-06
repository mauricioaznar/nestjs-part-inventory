import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PartsService } from './parts.service';
import { Component, Part, PartInput } from './parts.dto';
import { PartComponent } from '../part-components/part-components.dto';

@Resolver(() => Part)
@Injectable()
export class PartsResolver {
  constructor(private partsService: PartsService) {}

  @Mutation(() => Part)
  async createPart(@Args('partInput') input: PartInput) {
    return this.partsService.createPart(input);
  }

  @Mutation(() => Part)
  async updatePart(
    @Args('id') id: number,
    @Args('partInput') input: PartInput,
  ) {
    const part = await this.partsService.getPart(id);

    if (!part) {
      throw new NotFoundException(`part with id '${id}' not found`);
    }

    return this.partsService.updatePart(id, input);
  }

  @Query(() => [Part])
  async getParts() {
    return this.partsService.getProducts();
  }

  @ResolveField(() => [Component])
  async components(part: Part) {
    return this.partsService.getComponents(part);
  }
}
