import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Discount } from '../../discounts/models/discount.model';

interface ICategoryCreationAttr {
  name: string;
  description: string;
  parentId: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Categoryning noyob identifikatori (ID)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Electrojnika',
    description: 'Category nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: 'Electr jihozlari',
    description: 'Category haqida batafsil maʼlumot',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @ApiProperty({
    example: 1,
    description: 'Category ning parent id si',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare parentId: number;

  @HasMany(() => Discount)
  discount: Discount[];
}
