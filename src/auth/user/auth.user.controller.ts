import { Controller, Get, Post, Body, Res, Req, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { SignInUserDto } from './dto/user.sign-in.dto';
import { Request, Response } from 'express';
import { AuthUserService } from './auth.user.service';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';

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
  signOut(@CookieGetter('refresh_token_user') refreshToken:string, @Res({passthrough: true}) res: Response) {
    return this.authUserService.signOut(refreshToken, res);
  }
  
  
  @Post(':id/refresh/token')
  refreshTokenUser(@Param("id", ParseIntPipe) id: number, @CookieGetter("refresh_token_user") refreshToken: string,
@Res({passthrough: true}) res: Response) {
    return this.authUserService.refreshTokenUser(id, refreshToken, res)
  }
}
