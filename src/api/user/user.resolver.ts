import { Args, Mutation, Query, Resolver, Subscription, Info, Context, CONTEXT, GqlExecutionContext } from '@nestjs/graphql';
import { LoginArgs } from './user.args';
import { LoginRes, User } from './user.model';
import { UserService } from './user.service';
@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Query(returns => User)
  async test(): Promise<User> {
    return { userId: 1 };
  }

  @Mutation(returns => LoginRes, { description: "登陆" })
  async login(
    @Args() args: LoginArgs
  ): Promise<LoginRes> {
    console.log(args)
    return { res: true }
  }

}
