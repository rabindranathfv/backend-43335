import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('users')
// /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(
      '🚀 ~ file: users.controller.ts:21 ~ UsersController ~ create ~ createUserDto:',
      createUserDto,
    );
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(
      '🚀 ~ file: users.controller.ts:41 ~ UsersController ~ update ~ updateUserDto:',
      updateUserDto,
    );
    console.log(
      '🚀 ~ file: users.controller.ts:41 ~ UsersController ~ update ~ id:',
      id,
    );
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/test/:name/:lastname')
  testParams(
    @Param() param: any,
    @Req() req: Request,
    @Query('age') age: string,
    @Query('gender') gender: string,
    @Query() query: any,
  ) {
    console.log(
      '🚀 ~ file: users.controller.ts:62 ~ UsersController ~ testParams ~ query DECORATOR:',
      gender,
      age,
    );
    console.log(
      '🚀 ~ file: users.controller.ts:60 ~ UsersController ~ testParams ~ Param:',
      param,
      req.params,
      req.body,
      req.query,
    );

    const { age: ageDes, gender: genderDes } = query;
    console.log(
      '🚀 ~ file: users.controller.ts:82 ~ UsersController ~ ageDes:',
      ageDes,
    );
    console.log(
      '🚀 ~ file: users.controller.ts:82 ~ UsersController ~ genderDes:',
      genderDes,
    );

    return `hola ${param.name} ${param.lastname}`;
  }
}
