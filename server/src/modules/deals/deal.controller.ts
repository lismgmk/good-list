import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ParamIdValidationPipe } from '../../pipes/param-id-validation.pipe';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { User } from '../../schemas/user.schema';
import { DealService } from './deal.service';
import { DealContentDto } from './dto/content.dto';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAllDeals(
    @GetUserId()
    userId: string,
  ) {
    return await this.dealService.getAllDeals(userId);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getDealById(
    @Param('id', ParamIdValidationPipe)
    dealId: string,
    @GetUserId()
    userId: string,
  ) {
    return await this.dealService.getDealById({
      dealId,
      userId,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createDeal(
    @Body(new CustomValidationPipe())
    content: DealContentDto,
    @GetUserId()
    userId: User,
  ) {
    return await this.dealService.createDeal({
      content,
      userId,
    });
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async changeDeal(
    @Param('id', ParamIdValidationPipe)
    dealId: string,
    @Body(new CustomValidationPipe())
    content: DealContentDto,
    @GetUserId()
    userId: string,
  ) {
    return await this.dealService.changeDeal({
      dealId,
      content,
      userId,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteDeal(
    @Param('id', ParamIdValidationPipe)
    dealId: string,
    @GetUserId()
    userId: string,
  ) {
    return await this.dealService.deleteDeal({
      dealId,
      userId,
    });
  }
}
