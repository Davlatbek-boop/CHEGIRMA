import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Discount } from '../../discounts/models/discount.model';

interface ITypeCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'type' })
export class Type extends Model<Type, ITypeCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Typening noyob identifikatori (ID)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Electrojnika',
    description: 'Type nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: 'Electr jihozlari',
    description: 'Type haqida batafsil maʼlumot',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @HasMany(() => Discount)
  discount: Discount[];
}
