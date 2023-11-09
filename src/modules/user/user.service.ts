import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    await this.repository.save(user);

    const returnMessage = {
      message: 'User succesfully created'
    }

    return returnMessage;
  }

  public async findAll(options: IPaginationOptions) {
    return paginate<User>(this.repository, options);
  }
}
