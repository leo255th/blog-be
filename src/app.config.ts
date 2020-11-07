import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: {
  db: TypeOrmModuleOptions
} = {
  db: {
    type: "mysql" as "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "szSTj3g0KMQoAO4YRpXnWg9ZEMpfnK",
    database: "blog_be",
    entities: [__dirname + "/models/*.entity{.ts,.js}"],
    // entities: [UserEntity, ArticleEntity, TagEntity, CommentEntity, FieldEntity],
    synchronize: true, // 开发环境同步数据库
    logging: true,
  }
}
export const appConfig = config;
