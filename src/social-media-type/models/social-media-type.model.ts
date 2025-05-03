import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { StoreSocialLink } from '../../store-social_links/models/store-social_link.models';

interface ISocialMediaTypeCreationAttr {
  based_url: string;
  is_activa: boolean;
}

@Table({ tableName: 'social_media_types', timestamps: false })
export class SocialMediaType extends Model<
  SocialMediaType,
  ISocialMediaTypeCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'https://instagram.com',
    description: 'Asosiy URL manzili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare based_url: string;

  @ApiProperty({ example: true, description: 'Faollik holati' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_activa: boolean;

  @HasMany(()=> StoreSocialLink)
  storeSocialLink: StoreSocialLink[]
}
