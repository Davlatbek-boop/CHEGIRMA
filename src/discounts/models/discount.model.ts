import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Store } from '../../store/models/store.model';
import { Category } from '../../category/models/category.model';
import { Type } from '../../type/models/type.model';

interface IDiscountCreationAttr {
  title: string;
  description: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  storeId: number;
  categoryId: number;
  typeId: number;
}

@Table({ tableName: 'discounts' })
export class Discount extends Model<Discount, IDiscountCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: '50% chegirma', description: 'Chegirma sarlavhasi' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Har oyda takrorlanadi',
    description: 'Batafsil tavsif',
  })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: 50, description: 'Foizdagi chegirma' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  discount_percent: number;

  @ApiProperty({
    example: '2025-05-01',
    description: 'Chegirma boshlanish sanasi',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;

  @ApiProperty({ example: '2025-06-01', description: 'Chegirma tugash sanasi' })
  @Column({ type: DataType.DATE, allowNull: false })
  end_date: Date;

  @ApiProperty({ example: 100000, description: 'So‘mdagi chegirma qiymati' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  discount_value: number;

  @ApiProperty({
    example: 'https://example.com/discount123',
    description: 'Maxsus havola',
  })
  @Column({ type: DataType.STRING })
  special_link: string;

  @ApiProperty({ example: true, description: 'Chegirma faollik holati' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ApiProperty({ example: 3, description: 'Store ID' })
  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  storeId: number;

  @ApiProperty({ example: 5, description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @ApiProperty({ example: 2, description: 'Type ID' })
  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  typeId: number;

  @BelongsTo(()=> Store)
  store: Store

  @BelongsTo(()=> Category)
  category: Category

  @BelongsTo(()=> Type)
  type: Type

}
