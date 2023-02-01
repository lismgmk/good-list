import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConfigAsync } from '../../config/jwtconfig';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Deal, DealSchema } from '../../schemas/deal.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { JwtStrategy } from '../../strategyes/jwt.strategy';
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
    JwtModule.registerAsync(jwtConfigAsync),
  ],
  controllers: [DealController],
  providers: [
    DealService,
    UserService,
    JwtPassService,
    JwtService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class DealModule {}
