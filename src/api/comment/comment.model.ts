import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CommentEntity } from "src/models/comment.entity";
import { Result } from "../common/common.model";

@ObjectType()
export class Comment {
  @Field(type => Int, { description: '评论ID', nullable: false })
  commentId: number;
}

@ObjectType()
export class AddCommentRes {
  @Field(type => Result, { description: '结果', nullable: false })
  res: Result;
  @Field(type => Comment, { description: '评论', nullable: true })
  comment?: Comment;
}

@ObjectType()
export class CommentList {
  @Field(type => [CommentEntity], { description: '评论列表', nullable: 'itemsAndList' })
  list?: CommentEntity[];
  @Field(type => Int, { description: '总数', nullable: true })
  total?: number;
  
}