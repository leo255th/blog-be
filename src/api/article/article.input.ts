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

@InputType({ description: '搜索选项' })
export class ArticlesFilterInput {
  @Field(type => Int, { nullable: true, description: '作者ID' })
  readonly equal_userId?: number;
  @Field(type => String, { nullable: true, description: '领域' })
  readonly equal_field?: string;
  @Field(type => Date, { nullable: true, description: '最早发布时间' })
  readonly min_createdAt?: Date;
  @Field(type => Date, { nullable: true, description: '最晚发布时间' })
  readonly max_createdAt?: Date;
  @Field(type => [String], { nullable: 'itemsAndList', description: '文章标签' })
  readonly in_tags?: string[];
  @Field(type => Int, { defaultValue: 0, description: '偏移量' })
  readonly offset?: number;
  @Field(type => Int, { defaultValue: 10, description: '数量' })
  readonly num?: number;
}