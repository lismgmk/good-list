import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BlockList } from 'net';
import { BlackListSchema } from '../../schemas/black-list.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { JwtPassService } from '../jwt-pass/jwt-pass.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BlockList.name, schema: BlackListSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtPassService, UserService],
})
export class AuthModule {}
