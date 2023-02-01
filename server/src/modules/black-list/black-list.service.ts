import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlackList } from '../../schemas/black-list.schema';

@Injectable()
export class BlackListService {
  constructor(
    @InjectModel(BlackList.name) private blackListModel: Model<BlackList>,
  ) {}
  async addToken(token: string) {
    return this.blackListModel.create({ tokenValue: token }).exec();
  }

  async getToken(token: string) {
    return this.blackListModel
      .findOne({
        tokenValue: token,
      })
      .exec();
  }
}
