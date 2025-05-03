import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @ApiProperty({
    example: 'Elektronika',
    description: 'Tur nomi',
  })
  @IsString({ message: 'Nomi satr bo‘lishi kerak' })
  @Length(2, 50, { message: 'Nomi 2-50 ta belgidan iborat bo‘lishi kerak' })
  name: string;

  @ApiProperty({
    example: 'Bu tur elektron qurilmalarni o‘z ichiga oladi',
    description: 'Tur haqida qisqacha tavsif',
  })
  @IsString({ message: 'Tavsif satr bo‘lishi kerak' })
  @Length(5, 255, { message: 'Tavsif 5-255 ta belgidan iborat bo‘lishi kerak' })
  description: string;
}
