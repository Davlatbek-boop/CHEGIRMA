import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Store } from '../../store/models/store.model';

interface IStatusCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, IStatusCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Statusning noyob identifikatori (ID)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Active',
    description: 'Status nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: 'Foydalanuvchi faol holatda',
    description: 'Status haqida batafsil maʼlumot',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;


  @HasMany(()=> Store)
  store: Store[]
}
