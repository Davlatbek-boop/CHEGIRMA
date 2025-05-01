import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    example: 'Chilonzor',
    description: 'District nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Tegishli region ID raqami',
  })
  @IsInt()
  regionId: number;
}
