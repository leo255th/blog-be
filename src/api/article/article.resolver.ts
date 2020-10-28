import { Args, Mutation, Query, Subscription, Info, Context, CONTEXT, GqlExecutionContext, Parent, Int, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ArticleEntity } from 'src/models/article.entity';
import { result } from 'src/utils/result';
import { AddArticleInput, ArticlesFilterInput, EditArticleInput } from './article.input';
import { Article, AddArticleRes, EditArticleRes, ArticleList } from './article.model';
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

  // 查找单个文章的详情
  @ResolveProperty(returns => ArticleEntity, { name: "data", description: '文章详情' })
  async articleData(
    @Parent() article: Article
  ): Promise<ArticleEntity> {

    return await this.articleService.findOneArticle(article.articleId)
  }

  // 查找多个文章的列表
  @Query(returns => ArticleList, { name: 'articles', description: '文章列表', nullable: true })
  async articles(
    @Args('input') input: ArticlesFilterInput
  ) {
    return await this.articleService.findManyArticles(input);
  }
}
