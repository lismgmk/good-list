import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NOT_OWNER } from '../../consts/ad-validation-const';
import { Deal, IDeal } from '../../schemas/deal.schema';
import { IDealDto } from './dto/deal.interfaces';

@Injectable()
export class DealService {
  constructor(@InjectModel(Deal.name) private dealModel: Model<Deal>) {}

  async getAllDeals(dto: IDealDto) {
    await this.checkDealOwner({ userId: dto.userId, dealId: dto.dealId });
    const pipeline = [
      { $match: { userId: dto.userId } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          content: 1,
          createdAt: 1,
        },
      },
    ];
    return this.dealModel.aggregate(pipeline).exec();
  }

  async getDealById(dto: IDealDto) {
    await this.checkDealOwner({ userId: dto.userId, dealId: dto.dealId });
    const pipeline = [
      { $match: { _id: dto.dealId } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          content: 1,
          createdAt: 1,
        },
      },
    ];
    return this.dealModel.aggregate(pipeline).exec()[0];
  }

  async createDeal(dto: IDealDto) {
    await this.checkDealOwner({ userId: dto.userId, dealId: dto.dealId });

    const newDeal = new this.dealModel({
      content: dto.content,
      userId: dto.userId,
      createdAt: new Date().toISOString(),
    });
    const createdDeal = await this.dealModel.create(newDeal);
    return this.dealMapper(createdDeal);
  }

  async changeDeal(dto: IDealDto) {
    await this.checkDealOwner({ userId: dto.userId, dealId: dto.dealId });
    const param = {
      content: dto.content,
    };
    const changedDeal = await this.dealModel.findByIdAndUpdate(
      dto.dealId,
      param,
      { new: true },
    );
    return this.dealMapper(changedDeal);
  }

  async deleteDeal(dto: IDealDto) {
    await this.checkDealOwner({ userId: dto.userId, dealId: dto.dealId });
  }

  private async checkDealOwner(dto: IDealDto) {
    const currentDeal = await this.dealModel
      .findOne({ dealId: dto.dealId })
      .exec();
    if (!currentDeal) {
      throw new NotFoundException();
    }
    if (!currentDeal.userId.equals(dto.userId)) {
      throw new ForbiddenException(NOT_OWNER);
    }
  }

  private dealMapper(deal: IDeal & { _id: Types.ObjectId }) {
    return {
      id: deal._id.toString(),
      content: deal.content,
      createdAt: deal.createdAt,
    };
  }
}
