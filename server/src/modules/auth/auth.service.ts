import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlackList } from '../../schemas/black-list.schema';
import { JwtPassService } from '../jwt-pass/jwt-pass.service';
import { ICreateUser } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtPassService: JwtPassService,
    private configService: ConfigService,
    private userService: UserService,
    @InjectModel(BlackList.name) private blackListModel: Model<BlackList>,
  ) {}

  async registration(dto: ICreateUser) {
    await this.userService.createUser(dto);
  }

  async getRefreshAccessToken(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const expiredAccess = this.configService.get<string>('EXPIRED_ACCESS');
    const expiredRefresh = this.configService.get<string>('EXPIRED_REFRESH');

    const accessToken = await this.jwtPassService.createJwt(
      userId,
      expiredAccess,
    );
    const refreshToken = await this.jwtPassService.createJwt(
      userId,
      expiredRefresh,
    );
    return { accessToken, refreshToken };
  }
}
