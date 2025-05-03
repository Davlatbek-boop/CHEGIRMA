import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreSocialLinkDto {
  @ApiProperty({ example: 'https://facebook.com/mystore', description: 'Havola manzili' })
  @IsString()
  url: string;

  @ApiProperty({ example: 'Facebook sahifamiz', description: 'Izoh' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'Store ID' })
  @IsInt()
  storeId: number;

  @ApiProperty({ example: 2, description: 'Ijtimoiy tarmoq turi ID' })
  @IsInt()
  social_media_typeId: number;
}
