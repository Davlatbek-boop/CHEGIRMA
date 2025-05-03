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
import { SocialMediaType } from '../../social-media-type/models/social-media-type.model';


interface IStoreSocialLinkCreationAttr {
  url: string;
  description: string;
  storeId: number;
  social_media_typeId: number;
}

@Table({ tableName: 'store_social_links', timestamps: false })
export class StoreSocialLink extends Model<
  StoreSocialLink,
  IStoreSocialLinkCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'https://instagram.com/shopname',
    description: 'Do‘konning ijtimoiy tarmoqdagi havolasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare url: string;

  @ApiProperty({
    example: 'Instagram sahifamiz',
    description: 'Izoh yoki tavsif',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @ApiProperty({ example: 3, description: 'Bog‘langan do‘kon ID raqami' })
  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare storeId: number;

  @ApiProperty({ example: 2, description: 'Ijtimoiy tarmoq turi ID raqami' })
  @ForeignKey(() => SocialMediaType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare social_media_typeId: number;


  @BelongsTo(()=> Store)
  store: Store

  @BelongsTo(()=> SocialMediaType)
  socialMediaType: SocialMediaType
}
