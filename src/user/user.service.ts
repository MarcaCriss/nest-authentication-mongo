/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id, { password: 0 });
    if (!user)
      throw new NotFoundException('El usuario no existe o no esta autorizado');
    return user;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async create(data: CreateUserDto) {
    const userExists = await this.userModel.findOne({ email: data.email });
    if (userExists)
      throw new BadRequestException(
        'Ya existe un usuario registrado con este email',
      );
    const user = new this.userModel(data);
    const model = await user.save();
    const { password, ...rpta } = model.toJSON();
    return rpta;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userModel.updateOne({ _id: user._id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
