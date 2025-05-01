import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    example: 'Active',
    description: 'Status nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Foydalanuvchi faol holatda',
    description: 'Status haqida qoʻshimcha izoh',
  })
  @IsString()
  description: string;
}
