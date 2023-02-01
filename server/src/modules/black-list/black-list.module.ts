import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlackList, BlackListSchema } from '../../schemas/black-list.schema';
import { BlackListService } from './black-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlackList.name, schema: BlackListSchema },
    ]),
  ],
  providers: [BlackListService],
})
export class BlackListModule {}
