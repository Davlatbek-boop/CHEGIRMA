import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User){}
  async create(createUserDto: CreateUserDto) {
    
    const {password, confirm_password} = createUserDto

    if(password !== confirm_password){
      throw new BadRequestException("Parollar mos emas")
    }

    const hashed_password = await bcrypt.hash(password, 7)

    return this.userModel.create({...createUserDto, hashed_password});
  }

  findUserByEmail(email: string){
    return this.userModel.findOne({where:{email}})
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
