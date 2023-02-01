import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPassService } from '../modules/jwt-pass/jwt-pass.service';
import { IUser } from '../schemas/user.schema';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private jwtPassService: JwtPassService,
    private configService: ConfigService,
  ) {
    super({
      usernameField: 'login',
    });
  }

  async validate(userNameEmail: string, password: string): Promise<any> {
    const user = (await this.userService.getUserByLogin(
      userNameEmail,
    )) as IUser;

    let isMatchPass;

    if (user) {
      isMatchPass = await this.jwtPassService.checkPassBcrypt(
        password,
        user.passwordHash,
      );
    }

    if (!user || !isMatchPass) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
