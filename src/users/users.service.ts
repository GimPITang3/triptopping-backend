import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

import { createId } from '@paralleldrive/cuid2';

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.userId = createId();
    createdUser.google = createUserDto.google;

    const user = await createdUser.save();

    this.logger.log(user);

    return user;
  }

  async findByGoogleId(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ 'google.id': id }).exec();

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
