import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/models/user.model';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { SignInUserDto } from './dto/user.sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email,
    );

    if (candidate) {
      throw new ConflictException('Bunday emailli foydalanuvchi mavjud');
    }

    const newUser = await this.userService.create(createUserDto);

    return { message: "Foydalanuvchi qo'shildi", userId: newUser.id };
  }

  async signIn(signInUserDto: SignInUserDto, res: Response) {
    const user = await this.userService.findUserByEmail(signInUserDto.email);

    if (!user) {
      throw new BadRequestException("Email yoki Password noto'gri");
    }

    if (!user.is_active) {
      throw new BadRequestException('Avval emailni tasdiqlang');
    }

    const isValidPassword = await bcrypt.compare(
      signInUserDto.password,
      user.hashed_password,
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'gri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    res.cookie('refresh_token_user', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    return {
      message: 'Tizimga xush kelibsiz',
      accessToken,
    };
  }

  async signOut(req: Request, res: Response) {
    const refresh_token = req.cookies['refresh_token_user'];

    if (!refresh_token) {
      throw new UnauthorizedException(
        'Cookieda User refresh tokeni aniqlanmadi',
      );
    }

    const payload = await this.jwtService.decode(refresh_token);

    if (!payload) {
      throw new UnauthorizedException("Token noto'g'ri");
    }

    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new BadRequestException('Bunday tokenli foydalanuvchi topilmadi');
    }

    res.clearCookie('refresh_token_user', {
      httpOnly: true,
    });

    user.hashed_refresh_token = '';
    await user.save();

    return res.status(200).send('User logget out successfully');
  }

  async refreshTokenUser(req: Request, res: Response) {
    const refresh_token = req.cookies['refresh_token_user'];

    if (!refresh_token) {
      throw new UnauthorizedException(
        'Cookieda User refresh tokeni aniqlanmadi',
      );
    }

    const payload = await this.jwtService.decode(refresh_token);

    if (!payload) {
      throw new UnauthorizedException("Token noto'g'ri");
    }

    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new BadRequestException('Bunday refresh tokenli user topilmadi');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    res.cookie('refresh_token_user', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    return res.status(200).send({
      message: 'Refresh token yangilandi',
      accessToken,
    });
  }
}
