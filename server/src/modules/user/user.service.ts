import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FIELD_EXIST_VALIDATION_ERROR } from '../../consts/ad-validation-const';
import { User } from '../../schemas/user.schema';
import { JwtPassService } from '../jwt-pass/jwt-pass.service';
import { ICreateUser } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtPassService: JwtPassService,
  ) {}

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
  async createUser(dto: ICreateUser) {
    await this.checkExistUserByNameEmail(dto);
    const hashPassword = await this.jwtPassService.createPassBcrypt(
      dto.password,
    );
    const newUser = new this.userModel({
      login: dto.login,
      email: dto.email,
      passwordHash: hashPassword,
      createdAt: new Date().toISOString(),
    });
    const createdUser = (await this.userModel.create(newUser)) as User;
    return {
      id: createdUser._id.toString(),
      login: createdUser.login,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
    };
  }

  async checkExistUserByNameEmail(dto: Omit<ICreateUser, 'password'>) {
    const condition = { $or: [{ login: dto.login }, { email: dto.email }] };
    const checkExistUser = await this.userModel.findOne(condition).exec();

    if (checkExistUser) {
      throw new BadRequestException({
        message: FIELD_EXIST_VALIDATION_ERROR,
      });
    }
  }

  async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async getAllUsers() {
    const pipeline = [
      {
        $project: {
          _id: 0,
          id: '$_id',
          login: 1,
          email: 1,
          createdAt: 1,
        },
      },
    ];
    return this.userModel.aggregate(pipeline).exec();
  }
}
