import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin){}

  async create(createAdminDto: CreateAdminDto) {
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    return this.adminModel.create({...createAdminDto, hashed_password});
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.update(updateAdminDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}});
  }

  findAdminByEmail(email: string){
    return this.adminModel.findOne({where: {email}})
  }
}
