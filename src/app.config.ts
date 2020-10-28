import { ArticleEntity } from "./models/article.entity";
import { TagEntity } from "./models/tag.entity";
import { UserEntity } from "./models/user.entity";

const config = {
  db: {
    type: "mysql" as "mysql",
    host: "localhost",
    port: 3306,
    username: "leone",
    password: "123456",
    database: "blog-be",
    // entities: [__dirname + "/models/*.entity{.ts,.js}"], 
    entities:[UserEntity,ArticleEntity,TagEntity],
    synchronize: true, // 开发环境同步数据库
    logging: true
  }
}
export const appConfig = config;