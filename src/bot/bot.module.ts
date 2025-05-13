import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';
import { Address } from './model/address.model';
import { AddressUpdate } from './address/address.update';
import { AddressService } from './address/address.service';
import { AvtoService } from './avtomobil/avto.service';
import { AvtoUpdate } from './avtomobil/avto.update';
import { Avto } from './model/avtomobil.model';

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address, Avto])],
  controllers: [],
  providers: [
    BotService,
    AddressService,
    AvtoService,
    AddressUpdate,
    AvtoUpdate,
    BotUpdate,
  ],
  exports: [BotService],
})
export class BotModule {}
