import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ad } from './models/ad.model';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad) private readonly adModel: typeof Ad){}
  create(createAdDto: CreateAdDto) {
    return this.adModel.create(createAdDto);
  }

  findAll() {
    return this.adModel.findAll();
  }

  findOne(id: number) {
    return this.adModel.findByPk(id);
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return this.adModel.update(updateAdDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.adModel.destroy({where:{id}});
  }
}
