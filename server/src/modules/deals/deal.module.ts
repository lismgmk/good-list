import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Deal, DealSchema } from '../../schemas/deal.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { JwtPassService } from '../jwt-pass/jwt-pass.service';
import { UserService } from '../user/user.service';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deal.name, schema: DealSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [DealController],
  providers: [DealService, UserService, JwtPassService, JwtService],
})
export class DealModule {}
