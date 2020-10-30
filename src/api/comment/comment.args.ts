import { ArgsType, Field } from "@nestjs/graphql";
import { Comment2ArticleAddInput, Comment2ArticleGetInput, Comment2CommentAddInput, Comment2CommentGetInput, Comment2UserAddInput, Comment2UserGetInput } from "./comment.input";

@ArgsType()
export class AddCommentArgs {
  @Field(type => Comment2UserAddInput, { description: '留在用户主页的评论', nullable: true })
  toUser?: Comment2UserAddInput;
  @Field(type => Comment2ArticleAddInput, { description: '在文章详情页留下的评论', nullable: true })
  toArticle?: Comment2ArticleAddInput;
  @Field(type => Comment2CommentAddInput, { description: '对评论的评论', nullable: true })
  toComment?: Comment2CommentAddInput;
}

@ArgsType()
export class GetCommentsArgs {
  @Field(type => Comment2UserGetInput, { description: '获取某个用户主页下的评论', nullable: true })
  toUser?: Comment2UserGetInput;
  @Field(type => Comment2ArticleGetInput, { description: '获取某个文章下的评论', nullable: true })
  toArticle?: Comment2ArticleGetInput;
  @Field(type => Comment2CommentGetInput, { description: '获取某个评论的对话,根评论->一级评论，以及一级评论下的所有子评论', nullable: true })
  toComment?: Comment2CommentGetInput;
}