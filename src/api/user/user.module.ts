import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'
import { User } from '../../models/user'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, UserResolver]
})
export class UserModule { }
