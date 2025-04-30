import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { SignInUserDto } from './dto/user.sign-in.dto';
import { Request, Response } from 'express';
import { AuthUserService } from './auth.user.service';

@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authUserService.signUp(createUserDto);
  }

  @Post('sign-in')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authUserService.signIn(signInUserDto, res);
  }

  @Get('sign-out')
  signOut(@Req() req: Request, @Res() res: Response) {
    return this.authUserService.signOut(req, res);
  }
  

  @Post('refresh/token')
  refreshTokenUser(@Req() req: Request, @Res() res: Response){
    return this.authUserService.refreshTokenUser(req, res)
  }
}
