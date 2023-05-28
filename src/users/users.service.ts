import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createId } from '@paralleldrive/cuid2';

import { User, UserDocument } from './user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserNotFoundError } from 'src/errors/user-not-found.error';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel({
      userId: createId(),
      ...createUserDto,
    });

    const user = await createdUser.save();

    this.logger.verbose(user);

    return user;
  }

  async findByUserId(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ userId: id, deletedAt: undefined })
      .exec();

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async findByGoogleId(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ 'google.id': id, deletedAt: undefined })
      .exec();

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async existsByGoogleId(id: string): Promise<boolean> {
    const result = await this.userModel.exists({
      'google.id': id,
      deletedAt: undefined,
    });

    return result !== null;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      {
        userId: id,
        deletedAt: undefined,
      },
      {
        ...dto,
      },
      { returnOriginal: false },
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
