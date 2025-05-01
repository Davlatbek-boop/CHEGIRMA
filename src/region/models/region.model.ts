import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { District } from '../../district/models/district.model';
import { Store } from '../../store/models/store.model';

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, IRegionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Regionning noyob identifikatori (ID)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Region nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(()=> User)
  user: User[]

  @HasMany(()=> District)
  district: District[]

  @HasMany(()=> Store)
  store: Store[]
}
