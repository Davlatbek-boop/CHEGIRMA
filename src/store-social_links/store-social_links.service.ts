import { Injectable } from '@nestjs/common';
import { CreateStoreSocialLinkDto } from './dto/create-store-social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store-social_link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store-social_link.models';

@Injectable()
export class StoreSocialLinksService {
  constructor(@InjectModel(StoreSocialLink) private readonly storeSocialLinkModel: typeof StoreSocialLink){}
  create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinkModel.create(createStoreSocialLinkDto);
  }

  findAll() {
    return this.storeSocialLinkModel.findAll();
  }

  findOne(id: number) {
    return this.storeSocialLinkModel.findByPk(id);
  }

  update(id: number, updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {
    return this.storeSocialLinkModel.update(updateStoreSocialLinkDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.storeSocialLinkModel.destroy({where: {id}});
  }
}
