import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  userList: Array<User>; // User[]

  constructor() {
    this.userList = [];
  }

  create(createUserDto: CreateUserDto) {
    const newUser: CreateUserDto = {
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: createUserDto.password,
      id: this.userList.length === 0 ? 0 : this.userList.length + 1,
      avatar: createUserDto.avatar || '',
    };

    this.userList.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.userList;
  }

  findOne(id: number) {
    return this.userList.find((u: User) => u.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = this.findOne(id);

    user.first_name = updateUserDto.first_name || user.first_name;
    user.last_name = updateUserDto.last_name || user.last_name;
    user.email = updateUserDto.email || user.email;
    user.password = updateUserDto.password || user.password;

    return user;
  }

  remove(id: number) {
    const indexDel = this.userList.findIndex((u: User) => u.id === +id);
    return this.userList.splice(indexDel, 1)[0];
  }
}
