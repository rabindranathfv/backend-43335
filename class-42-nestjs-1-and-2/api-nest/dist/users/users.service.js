"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.userList = [];
    }
    create(createUserDto) {
        const newUser = {
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
    findAll() {
        return this.userList;
    }
    findOne(id) {
        return this.userList.find((u) => u.id === id);
    }
    update(id, updateUserDto) {
        const user = this.findOne(id);
        user.first_name = updateUserDto.first_name || user.first_name;
        user.last_name = updateUserDto.last_name || user.last_name;
        user.email = updateUserDto.email || user.email;
        user.password = updateUserDto.password || user.password;
        return user;
    }
    remove(id) {
        const indexDel = this.userList.findIndex((u) => u.id === +id);
        return this.userList.splice(indexDel, 1)[0];
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map