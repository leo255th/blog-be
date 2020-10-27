// args类型文件用于封装查询的参数以及操作的操作名和参数
// 对于query，一个argstype代表一种查询，具有几种类型的参数，每一个参数的集合用一个inputType表示
// 对于mutation，一个argstype代表一种操作，同上。

// import { ArgsType, Field } from "type-graphql";
import { Field, Int, ObjectType ,ArgsType} from "@nestjs/graphql";
import { ByPwdInput } from "./user.input";

// 参数
@ArgsType()
export class LoginArgs {
  @Field(type => ByPwdInput, { nullable: true, description: '密码' })
  byPwd?: ByPwdInput;
}
