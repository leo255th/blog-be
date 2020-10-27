import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { TagEntity } from 'src/models/tag.entity';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity,TagEntity])
  ],
  providers: [ArticleService, ArticleResolver]
})
export class ArticleModule { }
