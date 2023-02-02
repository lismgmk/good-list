import { Controller, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ParamIdValidationPipe } from '../../pipes/param-id-validation.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('add-friend/:id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async addFriend(
    @Param('id', ParamIdValidationPipe)
    friendId: string,
    @GetUserId()
    userId: string,
  ) {
    return this.userService.addFriend({
      friendId,
      userId,
    });
  }
}
