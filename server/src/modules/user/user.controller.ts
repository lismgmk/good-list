import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ParamIdValidationPipe } from '../../pipes/param-id-validation.pipe';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { AddFriendDto } from './dto/add-friend.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all-friends-list')
  @UseGuards(JwtAuthGuard)
  async getAllFriendsList(
    @GetUserId()
    userId: string,
  ) {
    return this.userService.getAllFriendsList(userId);
  }

  @Get('friend-list/:id')
  @UseGuards(JwtAuthGuard)
  async getFriendList(
    @Param('id', ParamIdValidationPipe)
    friendId: string,
    @GetUserId()
    userId: string,
  ) {
    return this.userService.getFriendList({ friendId, userId });
  }

  @Post('add-friend')
  @UseGuards(JwtAuthGuard)
  async addFriend(
    @Body(new CustomValidationPipe())
    friendLogin: AddFriendDto,
    @GetUserId()
    userId: string,
  ) {
    const friend = { friendLogin: friendLogin.login.substring(1) };
    await this.userService.addFriend({
      ...friend,
      userId,
    });
    return friend;
  }
}
