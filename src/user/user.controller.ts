import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiTags('User')
  @ApiBody({
    type: CreateUserDto,
    description: "Request JSON for User"
  })
  @ApiResponse({
    status: 201,
    description: "User succesfully created"
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiTags('User')
  findAll() {
    return this.userService.findAll();
  }
}
