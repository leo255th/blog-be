import { Args, Mutation, Query, Resolver, Subscription, Info, Context, CONTEXT, GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from './user.service';
@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Query(
    returns => String,
    {
      name: 'hello',
      description: '测试',
      nullable: false,
    },
  )
  async hello(): Promise<string> {
    return 'world';
  }

}
