import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BlackListSchema, BlackList } from '../../schemas/black-list.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { LocalStrategy } from '../../strategyes/local.strategy';
import { BlackListService } from '../black-list/black-list.service';
import { JwtPassService } from '../jwt-pass/jwt-pass.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BlackList.name, schema: BlackListSchema },
    ]),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtPassService,
    UserService,
    JwtService,
    BlackListService,
    LocalStrategy,
  ],
})
export class AuthModule {}
