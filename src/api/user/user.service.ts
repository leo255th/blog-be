import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user";
import { Repository } from "typeorm";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly heroRepository: Repository<User>
  ) { }
}