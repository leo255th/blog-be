import { Args, Mutation, Query, Subscription, Info, Context, CONTEXT, GqlExecutionContext, Parent, Int, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ArticleEntity } from 'src/models/article.entity';
import { FieldEntity } from 'src/models/field.entity';
import { result } from 'src/utils/result';
import { AddArticleInput, ArticlesFilterInput, EditArticleInput } from './article.input';
import { Article, AddArticleRes, EditArticleRes, ArticleList } from './article.model';
import { ArticleService } from './article.service';
@Resolver(of => ArticleEntity)
export class ArticleEntityResolver {
  constructor(
    private articleService: ArticleService,
  ) { }

  // 查找单个文章的标签
  @ResolveProperty(returns => [String], { name: "data", description: '文章详情' })
  async articleData(
    @Parent() article: ArticleEntity
  ): Promise<string[]> {
    return await this.articleService.getTags(article.id);
  }
}
