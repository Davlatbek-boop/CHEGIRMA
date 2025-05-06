import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { MailModule } from '../mail/mail.module';
import { BotModule } from '../bot/bot.module';
import { Otp } from './models/otp.model';
import { Favourites } from './models/favourites.model';
import { StoreSupscribes } from './models/store-supscribes.model';

@Module({
  imports:[SequelizeModule.forFeature([User, Otp, Favourites, StoreSupscribes]), MailModule, BotModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
