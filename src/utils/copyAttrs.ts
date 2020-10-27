// 将source对象的字段里的非空数据覆盖至target对象的同名字段
export function copyAttrs(
  target: any,
  source: any,
  attrs = Object.keys(source)
)
  : void {
  for (const attr of attrs) {
    target[attr] = source[attr] == null ? target[attr] : source[attr]
  }

}