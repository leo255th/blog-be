// 生成结果类

import { Result } from "src/api/common/common.model";

export function result(done: boolean, msg?: string): Result {
  return {
    done,
    errMsg: msg ? msg : undefined
  }
}