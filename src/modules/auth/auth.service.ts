import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,

    private readonly jwtService: JwtService
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

    const claimsPayload = { 
      user_id: existingUser.id, 
      email: existingUser.email 
    };

    return {
      access_token: await this.jwtService.signAsync(claimsPayload)
    }
  }
}
