import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { FieldEntity } from 'src/models/field.entity';
import { TagEntity } from 'src/models/tag.entity';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { ArticleEntityResolver } from './articleEntity.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, TagEntity, FieldEntity])
  ],
  providers: [ArticleService, ArticleResolver, ArticleEntityResolver]
})
export class ArticleModule { }
