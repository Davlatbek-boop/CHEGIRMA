import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService){}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.start(ctx)
  }
 
  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx)
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context){
    return this.botService.onStop(ctx)
  }

  @On('location')
  async onLocation(@Ctx() ctx: Context){
    await this.botService.onLocation(ctx)
  }


  // @On('photo')
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ('photo' in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 2].file_id),
  //     );
  //   }
  // }

  // @On('photo')
  // async onVideo(@Ctx() ctx: Context) {
  //   if ('video' in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_size));
  //     await ctx.replyWithVideo(ctx.message.video.file_id);
  //   }
  // }

  // @On('sticker')
  // async onSticker(@Ctx() ctx: Context) {
  //   if ('sticker' in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.reply(String(ctx.message.sticker.file_id));
  //   }
  // }

  // @On('animation')
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ('animation' in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.reply(ctx.message.animation.file_id);
  //   }
  // }

  // @On('document')
  // async onDocument(@Ctx() ctx: Context) {
  //   if ('document' in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.reply(ctx.message.document.file_name!);
  //   }
  // }

  // @On('contact')
  // async onContact(@Ctx() ctx: Context) {
  //   if ('contact' in ctx.message!) {
  //     console.log(ctx.message.contact);
  //     await ctx.reply(ctx.message.contact.phone_number);
  //     await ctx.reply(ctx.message.contact.first_name);
  //   }
  // }

  // @On('location')
  // async onLocation(@Ctx() ctx: Context) {
  //   if ('location' in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude,
  //     );
  //   }
  // }

  // @On('voice')
  // async onVoice(@Ctx() ctx: Context) {
  //   if ('voice' in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithVoice(ctx.message.voice.file_id);
  //   }
  // }

  // @Hears('hi')
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply('Hay here');
  // }

  // @Command('help')
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.reply('Ertage keling yordam beraman');
  // }

  // @Command('inline')
  // async onComandInline(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: 'Button 1',
  //         callback_data: 'button_1',
  //       },
  //       {
  //         text: 'Button 2',
  //         callback_data: 'button_2',
  //       },
  //       {
  //         text: 'Button 3',
  //         callback_data: 'button_3',
  //       },
  //     ],
  //     [
  //       {
  //         text: 'Button 4',
  //         callback_data: 'button_4',
  //       },
  //       {
  //         text: 'Button 5',
  //         callback_data: 'button_5',
  //       },
  //     ],
  //     [
  //       {
  //         text: 'Button 6',
  //         callback_data: 'button_6',
  //       },
  //     ],
  //   ];

  //   await ctx.reply('Kerakli tugmani tanlang', {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }
  // // button bosilganida ishlaydi
  // @Action('button1')
  // async onActionButton1(@Ctx() ctx: Context) {
  //   await ctx.reply('Button 1 bosildi');
  // }

  // @Action('button2')
  // async onActionButton2(@Ctx() ctx: Context) {
  //   await ctx.reply('Button 2 bosildi');
  // }

  // @Action(/^button_\d+$/)
  // async onActionAnyButton2(@Ctx() ctx: Context) {
  //   if ('data' in ctx.callbackQuery!) {
  //     const buttonData = ctx.callbackQuery?.data;
  //     console.log(buttonData);
  //     const id = buttonData.split('_')[1];
  //     await ctx.reply(`${id} Button bosildi`);
  //   }
  // }

  // @Command('main')
  // async onComandMain(@Ctx() ctx: Context) {
  //   const mainKeyboard = [
  //     ['bir', 'ikki', 'uch'],
  //     ["to'rt", 'besh'],
  //     ['olti'],
  //     [Markup.button.contactRequest('Telefon raqamingizni yuboring')],
  //     [Markup.button.locationRequest('Locatisiyangizni yuboring')],
  //   ];

  //   await ctx.reply('Kerakli Min Buttonni tanlang', {
  //     ...Markup.keyboard(mainKeyboard).resize(),
  //   });
  // }

  // @Hears('bir')
  // async onHearsButtonBir(@Ctx() ctx: Context) {
  //   await ctx.reply('Main Button 1 bosildi');
  // }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    return this.botService.onText(ctx)
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    // console.log(ctx.botInfo);
    // console.log('--------------------');
    // console.log(ctx.chat);
    // console.log('--------------------');
    // console.log(ctx.chat!.id);
    // console.log('--------------------');
    // console.log(ctx.from);
    // console.log('--------------------');
    // console.log(ctx.from!.id);
  }
} 
