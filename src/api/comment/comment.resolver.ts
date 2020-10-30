import { Args, Mutation, Query, Subscription, Info, Context, CONTEXT, GqlExecutionContext, Parent, Int, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ArticleEntity } from 'src/models/article.entity';
import { result } from 'src/utils/result';
import { AddCommentInput } from './comment.input';
import { AddCommentRes, Comment } from './comment.model';
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

  @Mutation(returns => AddCommentRes, { description: '添加评论' })
  async addComment(
    @Args('input') input: AddCommentInput
  ): Promise<AddCommentRes> {
    return { res: { done: true } }
  }
}
