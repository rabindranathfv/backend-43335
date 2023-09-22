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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(userModel, configSrv) {
        this.userModel = userModel;
        this.configSrv = configSrv;
    }
    create(createUserDto) {
        return this.userModel.create(createUserDto);
    }
    findAll() {
        const modeEnv = this.configSrv.get('MODE');
        console.log('🚀 ~ file: users.service.ts:22 ~ UsersService ~ findAll ~ modeEnv:', modeEnv);
        return this.userModel.find();
    }
    findOne(id) {
        return this.userModel.findOne({ _id: id });
    }
    update(id, updateUserDto) {
        return this.userModel.updateOne({ _id: id }, updateUserDto);
    }
    remove(id) {
        return this.userModel.deleteOne({ _id: id });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map