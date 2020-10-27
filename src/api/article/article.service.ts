import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { TagEntity } from 'src/models/tag.entity';
import { UserEntity } from 'src/models/user.entity';
import { copyAttrs } from 'src/utils/copyAttrs';
import { pwdEncrypt } from 'src/utils/pwdEnc';
import { result } from 'src/utils/result';
import { Repository } from 'typeorm';
import { AddArticleInput, EditArticleInput } from './article.input';
import { AddArticleRes, EditArticleRes } from './article.model';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) { }

  // 添加文章
  async add(dto: AddArticleInput) {
    let article = new ArticleEntity();
    article.title = dto.title;
    article.content = dto.content;
    article.field = dto.field;
    article.userId = dto.userId;
    // 保存文章
    article = await this.articleRepository.save(article);
    // 如果保存失败，返回
    console.log('保存的文章是:', article);
    if (!article) {
      return { res: result(false, '未知错误，保存失败') }
    }
    // 保存标签
    const res = await Promise.all(
      dto.tags.map(
        async tagContent => {
          const tag = new TagEntity();
          tag.content = tagContent;
          tag.articleId = article.id;
          return this.tagRepository.save(tag);
        }
      )
    ).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
    if (res) {
      return { res: result(true), article: { articleId: article.id } }
    }
  }

  // 编辑文章
  async edit(dto: EditArticleInput): Promise<EditArticleRes> {
    let article = await this.articleRepository.findOne(dto.id);
    const newTags = dto.tags;
    delete dto.tags;
    delete dto.id;
    copyAttrs(article, dto);
    // 保存修改
    article = await this.articleRepository.save(article);
    // 修改tag
    const oldTags = await (await this.tagRepository.find({ where: { articleId: dto.id } })).map(res => res.content);

    const addTags = newTags.filter(
      (tag) => {
        return oldTags.indexOf(tag) === -1;
      }
    )
    const delTags = oldTags.filter(
      (tag) => {
        return newTags.indexOf(tag) === -1;
      }
    )
    // 保存tag修改
    const flag1 = await Promise.all(
      addTags.map(
        async tagContent => {
          const tag = new TagEntity();
          tag.content = tagContent;
          tag.articleId = article.id;
          return this.tagRepository.save(tag);
        }
      )
    ).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
    const flag2 = await Promise.all(
      delTags.map(
        async tagContent => {
          return this.tagRepository.delete({ articleId: article.id, content: tagContent });
        }
      )
    ).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
    if (flag1 && flag2) {
      return { res: result(true), article: { articleId: article.id } }
    } else {
      return { res: result(false, '未知错误,编辑文章失败') }
    }
  }
}
