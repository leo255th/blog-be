import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { UserEntity } from 'src/models/user.entity';
import { pwdEncrypt } from 'src/utils/pwdEnc';
import { result } from 'src/utils/result';
import { Repository } from 'typeorm';
import { ByPwdInput, ByUserNameInput } from './user.input';
import { RegisterRes, LoginRes, FieldCount, DateCount } from './user.model'
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
  async getUserFields(userId: number): Promise<FieldCount[]> {
    const qs = this.articleRepository.createQueryBuilder('article');
    const res = await qs
      .where('article.userId=:userId', { userId: +userId })
      .andWhere('article.isDeleted=0')
      .select('article.field', 'field')
      .addSelect('count(article.field)', 'num')
      .groupBy('article.field')
      .getRawMany();
    return res;
  }

  // 查询用户文章日期归档
  async getUserDateSets(userId: number): Promise<DateCount[]> {
    const qs = this.articleRepository.createQueryBuilder('article');
    const res = await qs
      .where('article.userId=:userId', { userId: +userId })
      .andWhere('article.isDeleted=0')
      .select('article.createdAt', 'time')
      .getRawMany();
    const timeList: Date[] = res.map(item => new Date(item.time));
    console.log('查询到的时间列表是：', timeList);
    const timeMap = new Map<number, Object>();
    for (const time of timeList) {
      const year = time.getFullYear();
      // 从0开始，所以加一
      const month = time.getMonth() + 1;
      const obj = timeMap.get(year);
      if (obj) {
        if (obj[month]) {
          obj[month] += 1;
        } else {
          obj[month] = 1;
        }
        // 保存修改
        timeMap.set(year, obj);
      } else {
        // 初始化
        const obj = {};
        obj[month] = 1;
        timeMap.set(year, obj)
      }
    }
    const dateSet: DateCount[] = [];
    timeMap.forEach((obj, year) => {
      const months = Object.keys(obj);
      for (const month of months) {
        dateSet.push({
          year: +year,
          month: +month,
          num: obj[month]
        })
      }
    })
    return dateSet
  }
}
