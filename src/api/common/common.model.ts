// 存放graphql公用类型

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: '请求的结果' })
export class Result {
  @Field(type => Boolean, { description: '结果', nullable: false })
  done: boolean;
  @Field(type => String, { description: '错误信息', nullable: true })
  errMsg?: string;
}