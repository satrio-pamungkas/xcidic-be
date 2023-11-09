import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public async create(request: CreateUserDto) {
    const existingUser = await this.repository.findOneBy({ email: request.email });

    if (existingUser) {
      throw new UnprocessableEntityException(`User with email:${request.email} already exists`);
    }

    const saltOrRounds = 10;
    const user = this.repository.create(request);
    user.password = await bcrypt.hash(user.password, saltOrRounds);
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
