import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { pwdEncrypt } from 'src/utils/pwdEnc';
import { result } from 'src/utils/result';
import { Repository } from 'typeorm';
import { ByPwdInput, ByUserNameInput } from './user.input';
import { RegisterRes, LoginRes } from './user.model'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  // 用户注册
  async registerByUserName(dto: ByUserNameInput): Promise<RegisterRes> {
    // 查找用户名
    const user = await this.userRepository.findOne({
      where: {
        userName: dto.userName,
      },
    });
    if (user) {
      console.log('用户名已存在，注册失败');
      return {
        res: result(false, '用户名已存在')
      }
    } else {
      // 用户名不存在，使用用户提供的信息注册新账号
      let newUser = new UserEntity();
      newUser.userName = dto.userName;
      newUser.passWord = pwdEncrypt(dto.pwd);
      newUser = await this.userRepository.save(newUser);
      return {
        res: {
          done: true
        },
        user: {
          userId: newUser.id
        }
      }
    }
  }

  // 用户登陆
  async loginByPwd(
    dto: ByPwdInput
  ): Promise<LoginRes> {
    // 查找用户
    const user = await this.userRepository.findOne({
      where: {
        userName: dto.userName
      }
    })
    if (!user) {
      // 用户不存在
      return { res: result(false, '用户名不存在') };
    } else {
      const pwd = pwdEncrypt(dto.pwd);
      if (pwd == user.passWord) {
        return { res: result(true), user: { userId: user.id } }
      } else {
        return { res: result(false, '密码错误') }
      }
    }
  }
}
