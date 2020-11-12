import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'
import { UserEntity } from '../../models/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,ArticleEntity])
  ],
  providers: [UserService, UserResolver]
})
export class UserModule { }
