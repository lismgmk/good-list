import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../../schemas/user.schema';
import { BasicStrategy } from '../../strategyes/auth-basic.strategy';
import { JwtPassService } from '../jwt-pass/jwt-pass.service';
import { UserService } from '../user/user.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UserService,
    JwtPassService,
    JwtService,
    BasicStrategy,
  ],
})
export class AdminModule {}
