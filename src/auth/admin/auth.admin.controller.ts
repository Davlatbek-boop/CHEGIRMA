import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { SignInAdminDto } from './dto/admin.sign-in.dto';
import { AuthAdminService } from './auth.admin.service';
import { Request, Response } from 'express';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}
  @Post('sign-up')
  signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authAdminService.signUp(createAdminDto);
  }

  @Post('sign-in')
  signIn(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authAdminService.signIn(signInAdminDto, res);
  }

  @Get('sign-out')
  signOut(@Req() req: Request, @Res() res: Response) {
    return this.authAdminService.signOut(req, res);
  }
}
