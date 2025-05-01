import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Emailga xat yuborishda xatolik');
    }

    return newUser;
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updatedUser = await this.userModel.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (updatedUser[1][0]) {
      throw new BadRequestException('User already activated');
    }

    return {
      message: 'User activated successfully',
      // is_active: updatedUser[1][0].is_active,
    };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id } },
    );

    return updatedUser;
  }
}
