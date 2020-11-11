import { Args, Mutation, Query, Subscription, Info, Context, CONTEXT, GqlExecutionContext, Parent, Int, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ArticleEntity } from 'src/models/article.entity';
import { result } from 'src/utils/result';
import { AddCommentArgs, GetCommentsArgs } from './comment.args';
import { } from './comment.input';
import { AddCommentRes, Comment, CommentList } from './comment.model';
import { CommentService } from './comment.service';
@Resolver()
export class CommentResolver {
  constructor(
    private commentService: CommentService,
  ) { }

  @Query(returns => Comment)
  async comment(
    @Args({ name: 'commentId', type: () => Int, description: '评论ID' }) commentId: number,
  ): Promise<Comment> {
    return { commentId } as Comment;
  }

  @Mutation(returns => AddCommentRes, { name: 'addComment', description: '添加评论' })
  async addComment(
    @Args() args: AddCommentArgs,
  ): Promise<AddCommentRes> {
    return await this.commentService.addComment(args);
  }

  @Query(returns => CommentList)
  async comments(
    @Args() args: GetCommentsArgs,
  ): Promise<CommentList> {
    if (args.toUser) {
      return this.commentService.getComments2User(args.toUser);
    } else if (args.toArticle) {
      return this.commentService.getComments2Article(args.toArticle);
    } else if (args.toComment) {
      return this.commentService.getComments2Comment(args.toComment);
    }
  }
}
