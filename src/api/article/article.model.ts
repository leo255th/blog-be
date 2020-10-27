// model类型文件用于描述Query和Mutation返回的复杂的对象，
// 也可能是虚拟的一个业务对象(不直接使用数据库类，而是使用计算属性，将数据库类包含其中，成为一个字段)，用作graphql schema图中的核心结点

import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Result } from "../common/common.model";

// import { Field, Int, ObjectType } from 'type-graphql';

// 虚拟业务对象，文章类
@ObjectType()
export class Article {
  @Field(type => Int, { description: '文章ID', nullable: false })
  articleId: number;
}

@ObjectType()
export class AddArticleRes {
  @Field(type => Result, { description: '结果', nullable: false })
  res: Result;
  @Field(type => Article, { description: '文章', nullable: true })
  article?: Article;
}

@ObjectType()
export class EditArticleRes {
  @Field(type => Result, { description: '结果', nullable: false })
  res: Result;
  @Field(type => Article, { description: '文章', nullable: true })
  article?: Article;
}
