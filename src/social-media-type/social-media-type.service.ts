import { Injectable } from '@nestjs/common';
import { CreateSocialMediaTypeDto } from './dto/create-social-media-type.dto';
import { UpdateSocialMediaTypeDto } from './dto/update-social-media-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMediaType } from './models/social-media-type.model';

@Injectable()
export class SocialMediaTypeService {
  constructor(@InjectModel(SocialMediaType) private readonly socialMediaTypeModel: typeof SocialMediaType){}
  create(createSocialMediaTypeDto: CreateSocialMediaTypeDto) {
    return this.socialMediaTypeModel.create(createSocialMediaTypeDto);
  }

  findAll() {
    return this.socialMediaTypeModel.findAll();
  }

  findOne(id: number) {
    return this.socialMediaTypeModel.findByPk(id);
  }

  update(id: number, updateSocialMediaTypeDto: UpdateSocialMediaTypeDto) {
    return this.socialMediaTypeModel.update(updateSocialMediaTypeDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.socialMediaTypeModel.destroy({where:{id}});
  }
}
