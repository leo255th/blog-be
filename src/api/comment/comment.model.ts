import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Result } from "../common/common.model";

@ObjectType()
export class Comment {
  @Field(type => Int, { description: '评论ID', nullable: false })
  commentId: number;
}
