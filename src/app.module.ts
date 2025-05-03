import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.model';
import { DistrictModule } from './district/district.module';
import { District } from './district/models/district.model';
import { StatusModule } from './status/status.module';
import { Status } from './status/models/status.model';
import { StoreModule } from './store/store.module';
import { Store } from './store/models/store.model';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { TypeModule } from './type/type.module';
import { Type } from './type/models/type.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { SocialMediaTypeModule } from './social-media-type/social-media-type.module';
import { SocialMediaType } from './social-media-type/models/social-media-type.model';
import { StoreSocialLinksModule } from './store-social_links/store-social_links.module';
import { StoreSocialLink } from './store-social_links/models/store-social_link.models';
import { DiscountsModule } from './discounts/discounts.module';
import { Discount } from './discounts/models/discount.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlevares: [],
        include: [BotModule],
      }),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Region, District, Status, Store, Type, Category, SocialMediaType, StoreSocialLink, Discount],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    RegionModule,
    DistrictModule,
    StatusModule,
    StoreModule,
    BotModule,
    TypeModule,
    CategoryModule,
    SocialMediaTypeModule,
    StoreSocialLinksModule,
    DiscountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
