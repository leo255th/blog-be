import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/models/user.entity";
import { Repository } from "typeorm";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly heroRepository: Repository<UserEntity>
  ) { }
}