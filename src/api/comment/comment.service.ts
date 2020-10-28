import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { TagEntity } from 'src/models/tag.entity';
import { UserEntity } from 'src/models/user.entity';
import { copyAttrs } from 'src/utils/copyAttrs';
import { pwdEncrypt } from 'src/utils/pwdEnc';
import { genInString } from 'src/utils/genInString'
import { result } from 'src/utils/result';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    
  ){}
}