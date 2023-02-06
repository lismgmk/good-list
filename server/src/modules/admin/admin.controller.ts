import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ParamIdValidationPipe } from '../../pipes/param-id-validation.pipe';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Post('/users')
  // @UseGuards(AuthGuard('basic'))
  async createUser(
    @Body(new CustomValidationPipe()) createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/users')
  @HttpCode(200)
  @UseGuards(AuthGuard('basic'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('/users/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard('basic'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(@Param('id', ParamIdValidationPipe) id: string) {
    return await this.userService.deleteUserById(id);
  }
}
