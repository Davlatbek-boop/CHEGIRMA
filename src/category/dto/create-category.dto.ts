import { IsString, IsOptional, IsInt, Min, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Maishiy texnika',
    description: 'Kategoriya nomi',
  })
  @IsString({ message: 'Nomi satr bo‘lishi kerak' })
  @Length(2, 50, { message: 'Nomi 2-50 belgidan iborat bo‘lishi kerak' })
  name: string;

  @ApiProperty({
    example: 'Bu kategoriya maishiy texnikani o‘z ichiga oladi',
    description: 'Kategoriya tavsifi',
  })
  @IsString({ message: 'Tavsif satr bo‘lishi kerak' })
  @Length(5, 255, { message: 'Tavsif 5-255 belgidan iborat bo‘lishi kerak' })
  description: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Yuqori kategoriyaning ID raqami (bo‘sh bo‘lishi mumkin)',
  })
  @IsOptional()
  @IsInt({ message: 'parentId butun son bo‘lishi kerak' })
  @Min(1, { message: 'parentId kamida 1 bo‘lishi kerak' })
  parentId: number;
}
