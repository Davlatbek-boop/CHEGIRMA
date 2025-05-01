import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';
import { Store } from '../../store/models/store.model';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Districtning noyob identifikatori (ID)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Chilonzor',
    description: 'District nomi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: 1,
    description: 'Tegishli regionning ID raqami (foreign key)',
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare regionId: number;

  @BelongsTo(()=>Region)
  region: Region

  @HasMany(()=> Store)
  store: Store[]
}
