import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validationSchema } from '../../config/validation';
import { Deal, DealSchema } from '../../schemas/deal.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    MongooseModule.forRoot(process.env.DB_CONNECT_MONGOOSE),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Deal.name, schema: DealSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
