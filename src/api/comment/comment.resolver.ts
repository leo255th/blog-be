import { Args, Mutation, Query, Subscription, Info, Context, CONTEXT, GqlExecutionContext, Parent, Int, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ArticleEntity } from 'src/models/article.entity';
import { result } from 'src/utils/result';
import { Comment } from './comment.model';
@Resolver()
export class CommentResolver {
  constructor(
  ) { }

  @Query(returns => Comment)
  async comment(
    @Args({ name: "commentId", type: () => Int, description: '评论ID' }) commentId: number
  ): Promise<Comment> {
    return { commentId } as Comment;
  }
}
