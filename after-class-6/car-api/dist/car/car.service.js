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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const car_schema_1 = require("./schema/car.schema");
const mongoose_2 = require("mongoose");
let CarService = class CarService {
    constructor(carModel) {
        this.carModel = carModel;
    }
    async create(createCarDto) {
        return await this.carModel.create(createCarDto);
    }
    async findAll() {
        return await this.carModel.find({});
    }
    async findOne(id) {
        return await this.carModel.findById(id);
    }
    async update(id, updateCarDto) {
        return await this.carModel.findByIdAndUpdate(id, updateCarDto, {
            new: true,
        });
    }
    async remove(id) {
        return await this.carModel.findByIdAndRemove(id);
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(car_schema_1.Car.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarService);
//# sourceMappingURL=car.service.js.map