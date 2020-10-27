import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module'
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './app.config';
import { ArticleModule } from './api/article/article.module';

@Module({
  imports: [
    UserModule,
    ArticleModule,
    GraphQLModule.forRoot({
      playground: true,  // 是否开启GraphQL IDE图形界面
      autoSchemaFile: 'schema.gql',//自动生成的gql文件的路径和文件名
      context: ({ req }) => ({ req }),
      cors: {
        credentials: true,
        //  origin:"http://localhost:4200",
        origin: /.*/,
      }
    }),
    TypeOrmModule.forRoot(appConfig.db)

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
