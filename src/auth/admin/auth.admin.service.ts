import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../../admin/admin.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { SignInAdminDto } from './dto/admin.sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../admin/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokenAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findAdminByEmail(
      createAdminDto.email,
    );

    if (admin) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }

    return this.adminService.create(createAdminDto);
  }

  async signIn(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(
      signInAdminDto.email,
    );

    if (!admin) {
      throw new BadRequestException('Email yoki parol xato');
    }

    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!admin) {
      throw new BadRequestException('Email yoki parol xato');
    }

    const { accessToken, refreshToken } = await this.generateTokenAdmin(admin);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    return {
      message: 'Admin paneliga hush kelibsiz',
      accessToken,
    };
  }

  async signOut(req: Request, res: Response) {
    const refresh_token = req.cookies['refreshToken'];

    if (!refresh_token) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const payload = await this.jwtService.decode(refresh_token);

    if (!payload) {
      throw new UnauthorizedException('Refresh token xato');
    }

    const admin = await this.adminService.findAdminByEmail(payload.email);

    if (!admin) {
      throw new BadRequestException(
        'Bunday refresh tokenli foydalanuvchi topilmadi',
      );
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
    });
    
    admin.hashed_password = '';
    await admin.save();

    return res.status(200).json({
        message: 'Admin logged out successfully',
      });
  }
}
