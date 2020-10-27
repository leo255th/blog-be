import { Field, InputType, Int } from "@nestjs/graphql";

@InputType({ description: '发布文章所需内容' })
export class AddArticleInput {

  @Field(type => Int, { description: '作者ID', nullable: false })
  userId: number;

  @Field(type => String, { description: "文章的标题", nullable: false })
  title: string;

  @Field(type => String, { description: '文章的内容（富文本）', nullable: false })
  content: string;

  @Field(type => String, { description: '文章的领域', nullable: false })
  field: string;

  @Field(type => [String], { description: '文章的标签', nullable: false })
  tags: string[];
}

@InputType({ description: '编辑文章所需内容' })
export class EditArticleInput {
  @Field(type => Int, { description: '文章ID', nullable: false })
  id: number;

  @Field(type => Int, { description: '作者ID', nullable: false })
  userId: number;

  @Field(type => String, { description: "文章的标题", nullable: false })
  title: string;

  @Field(type => String, { description: '文章的内容（富文本）', nullable: false })
  content: string;

  @Field(type => String, { description: '文章的领域', nullable: false })
  field: string;

  @Field(type => [String], { description: '文章的标签', nullable: false })
  tags: string[];
}

