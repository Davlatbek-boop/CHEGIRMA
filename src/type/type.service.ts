import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './models/type.model';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type)private readonly typeModel: typeof Type){}
  create(createTypeDto: CreateTypeDto) {
    return this.typeModel.create(createTypeDto);
  }

  findAll() {
    return this.typeModel.findAll();
  }

  findOne(id: number) {
    return this.typeModel.findByPk(id);
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return this.typeModel.update(updateTypeDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.typeModel.destroy({where:{id}});
  }
}
