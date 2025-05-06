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
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import * as uuid from 'uuid';
import { Otp } from './models/otp.model';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import { decode, encode } from '../common/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { where } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly mailService: MailService,
    private readonly botService: BotService,
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

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    //--------------------------Bot----------------------
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Avval botdan ro'yxatdan o'ting");
    }
    // return { message: 'OTP botga yuborildi' };
    //--------------------------Sms----------------------
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    return {
      message: 'OTP botga yuborildi',
      verification_key: encodedData,
    };

    //--------------------------Email----------------------
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      throw new BadRequestException('OTP bu telefon raqamga yuborilmagan');
    }

    const resultOTP = await this.otpModel.findByPk(details.otp_id);

    if (resultOTP == null) {
      throw new BadRequestException("Bunday OTP yo'q");
    }
    if (resultOTP.verified) {
      throw new BadRequestException('Bu OTP avval tekshirilgan');
    }

    if (resultOTP.expiration_time < currentDate) {
      throw new BadRequestException('Bu OTP ning vaqti tugagan');
    }

    if (resultOTP.otp != otp) {
      throw new BadRequestException('OTP mos emas');
    }
    const user = await this.userModel.update(
      {
        is_owner: true,
      },
      { where: { phone: phone_number }, returning: true },
    );

    if(!user[1][0]){
      throw new BadRequestException("Bunday foydalanuvchi yo'q")
    }

    await this.otpModel.update(
      {verified: true},
      {where: {id:details.otp_id}}
    )

    return {message: "Tabriklaymiz, siz owner bo'ldingiz"}
  }
}
