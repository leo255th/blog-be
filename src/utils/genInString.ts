// 将["a","b","c"]之类的字符串数组转换为字符串("a","b","c")用于typeorm
export function genInString(items: string[]): string {
  if (items === undefined || items.length == 0) {
    return '()';
  }
  const temp = items.map(item => '"' + item + '"',
  )
  const res = '(' + temp.toString() + ')';
  return res;
}