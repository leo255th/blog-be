import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { TagEntity } from 'src/models/tag.entity';
import { UserEntity } from 'src/models/user.entity';
import { copyAttrs } from 'src/utils/copyAttrs';
import { pwdEncrypt } from 'src/utils/pwdEnc';
import { genInString } from 'src/utils/genInString'
import { result } from 'src/utils/result';
import { Repository } from 'typeorm';
import { CommentEntity, CommentTypeSet } from 'src/models/comment.entity';
import { AddCommentRes, CommentList } from './comment.model';
import { AddCommentArgs } from './comment.args';
import { Comment2ArticleGetInput, Comment2CommentGetInput, Comment2UserGetInput } from './comment.input';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) { }

  // 添加评论
  async addComment(args: AddCommentArgs): Promise<AddCommentRes> {
    let comment = new CommentEntity();
    if (args.toArticle) {
      comment.commentType = CommentTypeSet.ARTICLE;
      copyAttrs(comment, args.toArticle);
    } else if (args.toComment) {
      comment.commentType = CommentTypeSet.COMMENT;
      copyAttrs(comment, args.toComment);
    } else if (args.toUser) {
      comment.commentType = CommentTypeSet.USER;
      copyAttrs(comment, args.toUser);
    }
    comment = await this.commentRepository.save(comment);
    if (!comment) {
      return { res: result(false, '发送评论失败，未知错误') }
    } else {
      return { res: result(true), comment: { commentId: comment.id } };
    }
  }

  // 查看某个用户首页的评论
  async getComments2User(input: Comment2UserGetInput): Promise<CommentList> {
    const { commentedUserId, num, offset } = input;
    const qs = this.commentRepository.createQueryBuilder('comment');
    const res = qs.where('comment.commentedUserId=:commentedUserId', { commentedUserId })
      .orderBy({ "comment.createdAt": 'DESC' })
      .skip(offset)
      .take(num)
      .getManyAndCount();
    return {
      list: res[0],
      total: res[1],
    };
  }

  // 查看某个文章详情页下的评论
  async getComments2Article(input: Comment2ArticleGetInput): Promise<CommentList> {
    const { commentedArticleId, num, offset } = input;
    const qs = this.commentRepository.createQueryBuilder('comment');
    const res = qs.where('comment.commentedArticleId=:commentedArticleId', { commentedArticleId })
      .orderBy({ "comment.createdAt": 'DESC' })
      .skip(offset)
      .take(num)
      .getManyAndCount();
    return {
      list: res[0],
      total: res[1],
    };
  }

  // 查看某个评论对话
  async getComments2Comment(input: Comment2CommentGetInput): Promise<CommentList> {
    const { commentedParentCommentId, offset, num } = input;
    // 获取一级评论
    const parentComment = await this.commentRepository.findOne(commentedParentCommentId);
    // 获取根评论
    const rootComment = await this.commentRepository.findOne(parentComment.commentedCommentId);

    const list: CommentEntity[] = [];
    list.push(rootComment);
    list.push(parentComment);

    // 获取一级评论下所有子评论
    const qs = this.commentRepository.createQueryBuilder('comment');
    let res = await qs.where('comment.commentedParentCommentId=:commentedParentCommentId', { commentedParentCommentId })
      .orderBy({ "comment.createdAt": 'DESC' })
      .skip(offset)
      .take(num)
      .getManyAndCount();
    return {
      list: list.concat(res[0]),
      total: res[1] + 2
    }
  }
}