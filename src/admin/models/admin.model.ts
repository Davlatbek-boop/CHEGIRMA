import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdminCreationAttr {
  full_name: string;
  user_name: string;
  email: string;
  hashed_password: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'adminning primary Id si',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Andrey',
    description: 'admin uchun fullname',
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare full_name: string;

  @ApiProperty({
    example: 'Cergeyev',
    description: 'admin uchun username',
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare user_name: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'admin emaili',
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'adminning passwordi',
  })
  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @ApiProperty({
    example: true,
    description: 'Admin uchun creatorligini belgilash',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @ApiProperty({
    example: true,
    description: 'Adminning activligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: true,
    description: 'Admin refresh token',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: null
  })
  declare hashed_refresh_token: string;
}
