import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { AccessToken, LoginInput, User, UserInput } from './auth.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => User)
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(@Args('loginInput') input: LoginInput) {
    const result = await this.authService.login(input);
    if (result) return result;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() currentUser: User) {
    return this.authService.findOneByUsername({
      username: currentUser.username,
    });
  }

  @Query(() => String, { nullable: true })
  async getServerVersion() {
    return process.env.npm_package_version;
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isUserOccupied(@Args('username') username: string) {
    const user = await this.authService.findOneByUsername({
      username,
    });
    return !!user;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(@Args('userInput') input: UserInput) {
    return this.authService.create(input);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id') id: number,
    @Args('userInput') input: UserInput,
  ) {
    return this.authService.update(id, input);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.authService.findAll();
  }
}
