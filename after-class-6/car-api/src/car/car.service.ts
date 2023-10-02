import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from './schema/car.schema';
import { Model } from 'mongoose';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async create(createCarDto: CreateCarDto) {
    return await this.carModel.create(createCarDto);
  }

  async findAll() {
    return await this.carModel.find({});
  }

  async findOne(id: string) {
    return await this.carModel.findById(id);
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    return await this.carModel.findByIdAndUpdate(id, updateCarDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.carModel.findByIdAndRemove(id);
  }
}
