import { Args, Mutation, Query, Resolver, Subscription, Info, Context, CONTEXT, GqlExecutionContext, ResolveField, Parent, Int } from '@nestjs/graphql';
import { result } from 'src/utils/result';
import { AddArticleInput, EditArticleInput } from './article.input';
import { Article, AddArticleRes, EditArticleRes } from './article.model';
import { ArticleService } from './article.service';
@Resolver(of => Article)
export class ArticleResolver {
  constructor(
    private articleService: ArticleService,
  ) { }
  @Query(returns => Article)
  async article(
    @Args({ name: "articleId", type: () => Int, description: '文章ID' }) articleId: number
  ): Promise<Article> {
    return { articleId } as Article;
  }

  @Mutation(returns => AddArticleRes, { name: 'addArticle', description: '添加文章' })
  async add(
    @Args('input') input: AddArticleInput,
  ): Promise<AddArticleRes> {
    return this.articleService.add(input);
  }

  @Mutation(returns => EditArticleRes, { name: 'editArticle', description: '编辑文章' })
  async edit(
    @Args('input') input: EditArticleInput
  ): Promise<EditArticleRes> {
    return this.articleService.edit(input);
  }
}
