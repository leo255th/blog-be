import { Field, Int, ObjectType } from "@nestjs/graphql";
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