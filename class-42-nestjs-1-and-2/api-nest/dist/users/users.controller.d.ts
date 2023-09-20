import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): CreateUserDto;
    findAll(): import("./entities/user.entity").User[];
    findOne(id: string): import("./entities/user.entity").User;
    update(id: string, updateUserDto: UpdateUserDto): import("./entities/user.entity").User;
    remove(id: string): import("./entities/user.entity").User;
    testParams(param: any, req: Request, age: string, gender: string, query: any): string;
}
