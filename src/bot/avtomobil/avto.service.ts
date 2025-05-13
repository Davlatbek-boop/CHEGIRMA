import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from '../model/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { Avto } from '../model/avtomobil.model';

@Injectable()
export class AvtoService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Avto) private readonly avtoModel: typeof Avto,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async onAvto(ctx: Context) {
    try {
      // const user_id = ctx.from?.id;
      // const user = await this.botModel.findByPk(user_id);

      await ctx.replyWithHTML("Avto bo'yicha kerakli tugmani bosing", {
        ...Markup.keyboard([['Mening Avtolarim', "Yangi avto qo'shish"]]),
      });
    } catch (error) {
      console.log(`Error on Avto`, error);
    }
  }

  async onNewAvto(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start</b> tugmasini bosing`, {
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      }

      await this.avtoModel.create({
        user_id: user_id!,
        last_state: "model"
      })

      await ctx.replyWithHTML('Yangi avto nomini kiriting', {
        ...Markup.removeKeyboard(),
      });
    } catch (error) {
      console.log(`Error on new avto`, error);
    }
  }

  // async onMyAddresses(ctx: Context) {
  //   try {
  //     const user_id = ctx.from?.id;
  //     const user = await this.botModel.findByPk(user_id);
  //     if (!user || !user.status) {
  //       await ctx.reply(`Siz avval ro'yxatan o'ting`, {
  //         parse_mode: 'HTML',
  //         ...Markup.keyboard([['/start']]).resize(),
  //       });
  //     } else {
  //       const addresses = await this.avtoModel.findAll({
  //         where: { user_id, last_state: 'finish' },
  //       });
  //       if (addresses.length == 0) {
  //         await ctx.replyWithHTML('Birorta manzil topilmadi', {
  //           ...Markup.keyboard([
  //             ['Mening manzillarim', "Yangi manzil qo'shish"],
  //           ]),
  //         });
  //       } else {
  //         addresses.forEach(async (address) => {
  //           await ctx.replyWithHTML(
  //             `<b>Manzil nomi:</b> ${address.name}\n<b>Manzil:</b> ${address.address}`,
  //             {
  //               reply_markup: {
  //                 inline_keyboard: [
  //                   [
  //                     {
  //                       text: "Locatsiyani ko'rish",
  //                       callback_data: `loc_${address.id}`,
  //                     },
  //                     {
  //                       text: "Manzilni o'chirish",
  //                       callback_data: `del_${address.id}`,
  //                     },
  //                   ],
  //                 ],
  //               },
  //             },
  //           );
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(`Error on My addresses`, error);
  //   }
  // }

  // async onClickLocation(ctx: Context) {
  //   try {
  //     const contextAction = ctx.callbackQuery!['data'];
  //     const contextMessage = ctx.callbackQuery!['message'];
  //     const address_id = contextAction.split('_')[1];
  //     const address = await this.avtoModel.findByPk(address_id);
  //     await ctx.deleteMessage(contextMessage?.message_id);
  //     await ctx.replyWithLocation(
  //       Number(address?.location?.split(',')[0]),
  //       Number(address?.location?.split(',')[1]),
  //     );
  //   } catch (error) {
  //     console.log('onClickLocation error', error);
  //   }
  // }

  async onClickDelete(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!['data'];
      const address_id = contextAction.split('_')[1];
      await this.avtoModel.destroy({ where: { id: address_id } });
      await ctx.editMessageText("Manzil o'chirildi");
    } catch (error) {
      console.log('onClickLocation error', error);
    }
  }
}
