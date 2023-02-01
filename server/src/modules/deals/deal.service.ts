import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deal } from '../../schemas/deal.schema';
import { IDealDto } from './dto/deal.interfaces';

@Injectable()
export class DealService {
  constructor(@InjectModel(Deal.name) private dealModel: Model<Deal>) {}

  async getAllDeals(dto: IDealDto) {}

  async getDealById(dto: IDealDto) {}

  async createDeal(dto: IDealDto) {}

  async changeDeal(dto: IDealDto) {}

  async deleteDeal(dto: IDealDto) {}

  async checkDealOwner(dto: IDealDto) {
	const currentDeal = await this.getDealById(dto.dealId)
	if()
  }
}
