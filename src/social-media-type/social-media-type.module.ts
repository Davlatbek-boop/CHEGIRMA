import { Module } from '@nestjs/common';
import { SocialMediaTypeService } from './social-media-type.service';
import { SocialMediaTypeController } from './social-media-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialMediaType } from './models/social-media-type.model';

@Module({
  imports:[SequelizeModule.forFeature([SocialMediaType])],
  controllers: [SocialMediaTypeController],
  providers: [SocialMediaTypeService],
})
export class SocialMediaTypeModule {}
