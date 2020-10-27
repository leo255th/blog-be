// import { Field, InputType } from "type-graphql";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType({ description: "密码登陆" })
export class ByPwdInput {
  @Field(type => String, { description: "用户名", nullable: false })
  userName: string;
  @Field(type => String, { description: '密码', nullable: false })
  pwd: string;
}
@InputType({ description: "用户名方式注册" })
export class ByUserNameInput {
  @Field(type => String, { description: "用户名", nullable: false })
  userName: string;
  @Field(type => String, { description: '密码', nullable: false })
  pwd: string;
}