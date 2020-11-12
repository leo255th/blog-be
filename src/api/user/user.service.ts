import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { UserEntity } from 'src/models/user.entity';
import { pwdEncrypt } from 'src/utils/pwdEnc';
import { result } from 'src/utils/result';
import { Repository } from 'typeorm';
import { ByPwdInput, ByUserNameInput } from './user.input';
import { RegisterRes, LoginRes, FieldCount } from './user.model'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
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

  // 查询用户信息
  async getUserInfo(userId: number): Promise<string> {
    const user = await this.userRepository.findOne(userId);
    if (user) {
      return user.userName;
    }
  }

  // 查询用户的领域数
  async getUserFields(userId: number): Promise<FieldCount> {
    const qs = this.articleRepository.createQueryBuilder('article');
    const res = await qs
      .where('article.userId=:userId', { userId })
      .select('article.field')
      .addSelect('count(article.field)', 'count')
      .groupBy('article.field')
      .getRawMany()
    console.log('获取的领域：', res)
    return;
  }
}
