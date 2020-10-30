import { Field, InputType, Int } from "@nestjs/graphql";
import { CommentTypeSet } from "src/models/comment.entity";

@InputType()
export class AddCommentInput {
  @Field(type => Int, { description: '发送人userId', nullable: false })
  userId: number;

  @Field(type => String, { nullable: false, description: "评论人用户名" })
  userName: string;


  @Field(type => CommentTypeSet, { description: '评论类型', nullable: false })
  commentType: CommentTypeSet;

  @Field(type => Int, { nullable: true, description: "被评论的用户的id" })
  commentedUserId?: number;

  @Field(type => Int, { nullable: true, description: "被评论的评论的id" })
  commentedCommentId?: number;

  @Field(type => Int, { nullable: true, description: "根评论下第一级评论的id" })
  commentedParentCommentId?: number;

  @Field(type => Int, { nullable: true, description: "被评论的文章的id" })
  commentedArticleId?: number;

  @Field(type => String, { description: "评论内容", nullable: false })
  content: string;
}