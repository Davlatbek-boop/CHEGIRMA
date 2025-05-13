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
import { BotService } from '../bot.service';
import { AvtoService } from './avto.service';


@Update()
export class AvtoUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly avtoService: AvtoService,
  ) {}

  @Command('avto')
  async onAvto(@Ctx() ctx: Context) {
    return this.avtoService.onAvto(ctx);
  }

  @Hears("Yangi avto qo'shish")
  async onNewAvto(@Ctx() ctx: Context){
    return this.avtoService.onNewAvto(ctx)
  }

  // @Hears("Mening manzillarim")
  // async onMyAvtos(@Ctx() ctx: Context){
  //   return this.avtoService.onMyAvtos(ctx)
  // }

  // @Action(/^loc_+\d+/)
  // async onClickLocation(@Ctx() ctx: Context){
  //   await this.avtoService.onClickLocation(ctx)
  // }

  // @Action(/^del_+\d+/)
  // async onClickDelete(@Ctx() ctx: Context){
  //   await this.avtoService.onClickDelete(ctx)
  // }
}
