import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validationSchema } from '../../config/validation';
import { BlackList, BlackListSchema } from '../../schemas/black-list.schema';
import { Deal, DealSchema } from '../../schemas/deal.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { BlackListModule } from '../black-list/black-list.module';
import { DealsModule } from '../deals/deals.module';
import { JwtPassModule } from '../jwt-pass/jwt-pass.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    MongooseModule.forRoot(process.env.DB_CONNECT_MONGOOSE),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Deal.name, schema: DealSchema },
      { name: BlackList.name, schema: BlackListSchema },
    ]),
    UserModule,
    BlackListModule,
    DealsModule,
    JwtPassModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
