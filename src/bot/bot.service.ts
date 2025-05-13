import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { Address } from './model/address.model';
import { Op } from 'sequelize';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          lang: ctx.from?.language_code!,
        });

        await ctx.replyWithHTML(
          `Iltimos, <b>📞 Telfon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest('📞 Telfon raqamni yuborish')],
            ])
              .oneTime()
              .resize(),
          },
        );
      } else if (!user.status || !user.phone_number) {
        await ctx.replyWithHTML(
          `Iltimos, <b>Telfon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest('Telfon raqamni yuborish')],
            ])
              .oneTime()
              .resize(),
          },
        );
      } else {
        await ctx.replyWithHTML(
          'Bu bot orqali Skidkachi dasturida Sotuvchilar faollashtiriladi',
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest('📞 Telfon raqamni yuborish')],
            ])
              .oneTime()
              .resize(),
          },
        );
      }
    } catch (error) {
      console.log(`Error on Start`, error);
    }
  }

  async onContact(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start</b> tugmasini bosing`, {
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      } else if (user.phone_number) {
        await this.bot.telegram.sendChatAction(user_id!, 'typing');
        await ctx.replyWithHTML("Siz avval ro'yxatdan o'tgansiz", {
          ...Markup.removeKeyboard(),
        });
      } else if (
        'contact' in ctx.message! &&
        ctx.message.contact.user_id != user_id
      ) {
        await ctx.replyWithHTML(
          `Iltimos, o'zingizni telefon raqamingizni yuboring`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest('📞 Telfon raqamni yuborish')],
            ])
              .oneTime()
              .resize(),
          },
        );
      } else if ('contact' in ctx.message!) {
        let phone = ctx.message.contact.phone_number;
        if (phone[0] != '+') {
          phone = '+' + phone;
        }
        user.phone_number = phone;
        user.status = true;
        await user.save();
        await ctx.replyWithHTML(`Tabriklayman ro'yxatdan otdingiz!`, {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log(`Error on Contact`, error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start</b> tugmasini bosing`, {
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = '';
        await user.save();
        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqdingiz. Qayta faollashtirish uchun <b>/start</b> tugmasini bosing`,
          {
            ...Markup.keyboard([['/start']])
              .oneTime()
              .resize(),
          },
        );
      }
    } catch (error) {
      console.log(`Error on Stop`, error);
    }
  }

  async sendOtp(phone_number: string, OTP: string) {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }
      await this.bot.telegram.sendMessage(user.user_id, `Verify code: ${OTP}`);
      return true;
    } catch (error) {
      console.log(`Error on sendOtp`, error);
    }
  }

  async onText(ctx: Context) {
    if ('text' in ctx.message!) {
      try {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Iltimos, <b>Start</b> tugmasini bosing`, {
            ...Markup.keyboard([['/start']])
              .oneTime()
              .resize(),
          });
        } else {
          const address = await this.addressModel.findOne({
            where: {
              user_id,
              last_state: { [Op.ne]: 'finish' },
            },
            order: [['id', 'DESC']],
          });
          if (address) {
            const userInput = ctx.message.text;
            switch (address.last_state) {
              case 'name':
                address.name = userInput;
                address.last_state = 'address';
                await address.save();
                await ctx.reply('Manzilingizni kiritin:', {
                  parse_mode: 'HTML',
                  ...Markup.removeKeyboard(),
                });
                break;

              case 'address':
                address.address = userInput;
                address.last_state = 'location';
                await address.save();
                await ctx.reply('Locatsiyangizni kiriting:', {
                  parse_mode: 'HTML',
                  ...Markup.keyboard([
                    [Markup.button.locationRequest('🎯 Locatsiyani yuboring')],
                  ]).resize(),
                });
                break;

            }
          }
        }
      } catch (error) {
        console.log(`Error on Address`, error);
      }
    }
  }


  async onLocation(ctx:Context){
    try {
      if("location" in ctx.message!){
        const user_id = ctx.from?.id
        const user = await this.botModel.findByPk(user_id)
        if(!user || !user.status){
          await ctx.reply(`Siz avval ro'yxatan o'ting`, {
            parse_mode: "HTML",
            ...Markup.keyboard([["/start"]]).resize()
          })
        } else {
          const address = await this.addressModel.findOne({
            where: {
              user_id,
              last_state: { [Op.ne]: 'finish' },
            },
            order: [['id', 'DESC']],
          });
          if(address && address.last_state == "location"){
            address.location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`
            address.last_state = "finish"
            await address.save()
            await ctx.reply("Manzil saqlandi", {
              parse_mode: "HTML",
              ...Markup.keyboard([
                ["Mening manzillarim","Yangi manzil qo'shish"]
              ]).resize()
            })
          }
        }
      }
    } catch (error) {
        console.log(`Error on OnLocation`, error);
    }
  }
}
