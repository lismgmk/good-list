import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ParamIdValidationPipe } from '../../pipes/param-id-validation.pipe';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { DealService } from '../deals/deal.service';
import { AddFriendDto } from './dto/add-friend.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dealService: DealService,
  ) {}

  @Get('all-friends-list/:id')
  @UseGuards(JwtAuthGuard)
  async getAllFriendsList(
    @GetUserId()
    userId: string,
  ) {
    return this.dealService.getAllFriendsList({ friendId, userId });
  }

  @Get('friend-list/:id')
  @UseGuards(JwtAuthGuard)
  async getFriendList(
    @Param('id', ParamIdValidationPipe)
    friendId: string,
    @GetUserId()
    userId: string,
  ) {
    return this.dealService.getFriendList({ friendId, userId });
  }

  @Post('add-friend')
  @UseGuards(JwtAuthGuard)
  async addFriend(
    @Body(new CustomValidationPipe())
    friendLogin: AddFriendDto,
    @GetUserId()
    userId: string,
  ) {
    return this.userService.addFriend({
      friendLogin: friendLogin.login.substring(1),
      userId,
    });
  }
}
