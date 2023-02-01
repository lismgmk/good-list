import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { User } from '../../schemas/user.schema';
import { BlackListService } from '../black-list/black-list.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly blackListService: BlackListService,
  ) {}

  @HttpCode(204)
  @Post('/registration')
  async createUser(
    @Body(new CustomValidationPipe()) createUser: CreateUserDto,
  ) {
    return this.authService.registration(createUser);
  }

  @HttpCode(200)
  @Post('/refresh-token')
  @UseGuards(CookieGuard)
  async getRefreshAccessToken(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @PureRefreshToken()
    refreshToken: string,
  ): Promise<ITokenResponse> {
    await this.blackListService.addToken(refreshToken);
    const tokens = await this.authService.getRefreshAccessToken(user.id);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: tokens.accessToken };
  }

  @HttpCode(200)
  @Post('/login')
  @UseGuards(LocalStrategyGuard)
  async login(
    @GetUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
    @Body(new CustomValidationPipe()) loginAuthDto: LoginAuthDto,
  ): Promise<ITokenResponse> {
    const tokens = await this.authService.getRefreshAccessToken(userId);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: tokens.accessToken };
  }

  @HttpCode(204)
  @Post('/logout')
  @UseGuards(CookieGuard)
  async logout(
    @PureRefreshToken()
    refreshToken: string,
  ) {
    await this.blackListService.addToken(refreshToken);
    return;
  }
}
