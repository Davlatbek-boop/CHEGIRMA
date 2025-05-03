import { Module } from '@nestjs/common';
import { StoreSocialLinksService } from './store-social_links.service';
import { StoreSocialLinksController } from './store-social_links.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store-social_link.models';

@Module({
  imports:[SequelizeModule.forFeature([StoreSocialLink])],
  controllers: [StoreSocialLinksController],
  providers: [StoreSocialLinksService],
})
export class StoreSocialLinksModule {}
