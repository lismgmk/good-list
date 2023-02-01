import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BlackListService } from '../modules/black-list/black-list.service';
import { JwtPassService } from '../modules/jwt-pass/jwt-pass.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(
    private blackListService: BlackListService,
    private jwtPassService: JwtPassService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const isChecked = await this.blackListService.getToken(refreshToken);
    const payload = await this.jwtPassService.decodeJwt(refreshToken);
    const user = await this.userService.getUserById(payload.id);
    const verify = await this.jwtPassService.verifyJwt(refreshToken);
    if (isChecked || !verify || !user) {
      throw new UnauthorizedException();
    }

    request.user = user;
    return true;
  }
}
