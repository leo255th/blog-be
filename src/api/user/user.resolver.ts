import { Args, Mutation, Query, Resolver, Subscription, Info, Context, CONTEXT, GqlExecutionContext, ResolveField, Parent, Int } from '@nestjs/graphql';
import { ArticleList } from '../article/article.model';
import { LoginArgs, RegisterArgs } from './user.args';
import { LoginRes, RegisterRes, User } from './user.model';
import { UserService } from './user.service';
@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Query(returns => User)
  async user(
    @Args({ name: "userId", type: () => Int, description: '用户ID' }) userId: number
  ): Promise<User> {
    return { userId } as User;
  }

  @Mutation(returns => LoginRes, { description: "登陆" })
  async login(
    @Args() args: LoginArgs
  ): Promise<LoginRes> {
    if (args.byPwd) {
      return await this.userService.loginByPwd(args.byPwd)
    }
  }

  @Mutation(returns => RegisterRes, { description: "注册" })
  async register(
    @Args() args: RegisterArgs
  ): Promise<RegisterRes> {
    if (args.byUserName) {
      return await this.userService.registerByUserName(args.byUserName);
    }
  }

  @ResolveField(returns => String, { name: "userName", description: '测试属性', nullable: true })
  async userInfo(
    @Parent() user: User
  ) {
    return await this.userService.getUserInfo(user.userId);
  }

}
