import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public async login(request: LoginDto) {
    const existingUser = await this.repository.findOneBy({ email: request.email });

    if (!existingUser) {
      throw new NotFoundException(`User with email:${request.email} is not registered`);
    }

    const isMatch = await bcrypt.compare(request.password, existingUser.password);

    if (!isMatch) {
      throw new UnauthorizedException("Wrong Credentials");
    }

    return "Ok";
  }
}
