import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Region } from '../../region/models/region.model';
import { District } from '../../district/models/district.model';
import { Status } from '../../status/models/status.model';


interface IStoreCreationAttr {
  name: string;
  location: string;
  phone: string;
  ownerId: number;
  description: string;
  regionId: number;
  districtId: number;
  address: string;
  statusId: number;
  open_time: Date;
  close_time: Date;
  weekday: number;
}

@Table({ tableName: 'store' })
export class Store extends Model<Store, IStoreCreationAttr> {
  @ApiProperty({ example: 1, description: 'Do‘konning ID raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'Tech Store', description: 'Do‘kon nomi' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    example: '41.12345, 69.12345',
    description: 'Geolokatsiya koordinatalari',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({ example: 5, description: 'Do‘kon egasining (User) ID raqami' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare ownerId: number;

  @ApiProperty({
    example: 'Elektronika do‘koni',
    description: 'Do‘kon haqida tavsif',
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @ApiProperty({ example: 1, description: 'Region ID raqami' })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare regionId: number;

  @ApiProperty({ example: 3, description: 'District ID raqami' })
  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare districtId: number;

  @ApiProperty({
    example: 'Yunusobod 19-dahasi, 12-uy',
    description: 'To‘liq manzil',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare address: string;

  @ApiProperty({
    example: 2,
    description: 'Status ID raqami (masalan: active/inactive)',
  })
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare statusId: number;

  @ApiProperty({ example: '08:00', description: 'Ochilish vaqti' })
  @Column({ type: DataType.TIME, allowNull: false })
  declare open_time: Date;

  @ApiProperty({ example: '21:00', description: 'Yopilish vaqti' })
  @Column({ type: DataType.TIME, allowNull: false })
  declare close_time: Date;

  @ApiProperty({ example: 1, description: 'Hafta kuni (1=Du, 7=Yak)' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare weekday: number;

  @BelongsTo(()=>User)
  user: User

  @BelongsTo(()=> Region)
  region: Region

  @BelongsTo(()=> District)
  district: District

  @BelongsTo(()=> Status)
  status: Status
}
