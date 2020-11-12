// model类型文件用于描述Query和Mutation返回的复杂的对象，
// 也可能是虚拟的一个业务对象(不直接使用数据库类，而是使用计算属性，将数据库类包含其中，成为一个字段)，用作graphql schema图中的核心结点

import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Result } from "../common/common.model";


// 虚拟业务对象，用户类 User
@ObjectType()
export class User {
  @Field(type => Int, { description: '用户ID', nullable: false })
  userId: number;
}

@ObjectType()
export class LoginRes {
  @Field(type => Result, { description: '登陆结果' })
  res: Result;

  @Field(type => User, { description: '登陆成功后返回用户信息', nullable: true })
  user?: User;
}

@ObjectType()
export class RegisterRes {
  @Field(type => Result, { description: '注册结果' })
  res: Result;

  @Field(type => User, { description: '注册成功后返回用户信息', nullable: true })
  user?: User;
}

@ObjectType()
export class FieldCount {
  @Field(type => String, { description: '领域名' })
  field: string;
  @Field(type => Int, { description: '对应数量' })
  num: number;
}
@ObjectType()
export class DateCount {
  @Field(type => Int, { description: '年' })
  year: number;
  @Field(type => Int, { description: '月' })
  month: number;
  @Field(type => Int, { description: '对应数量' })
  num: number;
}