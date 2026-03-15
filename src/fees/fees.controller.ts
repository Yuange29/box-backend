import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FeesService } from './fees.service';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { CreateFeeRequest } from './dto/create-fee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/roles/roles.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateFeeRequest } from './dto/update-fee.dto';

@Controller('fees')
@UseGuards(JwtAuthGuard, Role)
export class FeesController {
  constructor(private readonly feeService: FeesService) {}

  @Get()
  @Roles('USER', 'ADMIN')
  getUserFee(@CurrentUser() user: { userId: string }) {
    return this.feeService.getUserFee(user.userId);
  }

  @Post()
  @Roles('USER', 'ADMIN')
  createFee(
    @CurrentUser() user: { userId: string },
    @Body() request: CreateFeeRequest,
  ) {
    return this.feeService.createFee(user.userId, request);
  }

  @Patch(':feeId')
  @Roles('USER', 'ADMIN')
  updateFee(@Param('feeId') feeId: string, @Body() request: UpdateFeeRequest) {
    return this.feeService.updateFee(feeId, request);
  }

  @Delete(':feeId')
  @Roles('USER', 'ADMIN')
  deleteFee(@Param('feeId') feeId: string) {
    return this.feeService.deleteFee(feeId);
  }
}
