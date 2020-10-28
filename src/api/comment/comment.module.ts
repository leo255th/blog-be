import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { CommentEntity } from 'src/models/comment.entity';
import { TagEntity } from 'src/models/tag.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, TagEntity, CommentEntity])
  ],
  providers: [CommentResolver, CommentService]
})
export class CommentModule { }
