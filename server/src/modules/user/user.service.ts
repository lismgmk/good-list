import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByLogin(login: string) {
    return this.userModel
      .findOne({
        login,
      })
      .exec();
  }
  async getUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }
  async getUserById(id: string | ObjectId) {
    return this.userModel.findById(id).exec();
  }
}
