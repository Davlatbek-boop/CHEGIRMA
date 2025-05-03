import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsInt,
  Length,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
  @ApiProperty({ example: '50% chegirma', description: 'Chegirma sarlavhasi' })
  @IsString({ message: 'title matn bo‘lishi kerak' })
  @Length(2, 100, { message: 'title 2 dan 100 belgigacha bo‘lishi kerak' })
  title: string;

  @ApiProperty({
    example: 'Foydalanuvchilar uchun maxsus chegirma',
    description: 'Batafsil tavsif',
  })
  @IsString({ message: 'description matn bo‘lishi kerak' })
  @Length(5, 500, {
    message: 'description 5 dan 500 belgigacha bo‘lishi kerak',
  })
  description: string;

  @ApiProperty({ example: 20, description: 'Chegirma foizi' })
  @IsNumber({}, { message: 'discount_percent raqam bo‘lishi kerak' })
  @Min(0)
  @Max(100)
  discount_percent: number;

  @ApiProperty({
    example: '2025-05-01',
    description: 'Chegirma boshlanish sanasi (ISO formatda)',
  })
  @IsDateString(
    {},
    { message: 'start_date ISO formatdagi sana bo‘lishi kerak (YYYY-MM-DD)' },
  )
  start_date: Date;

  @ApiProperty({
    example: '2025-06-01',
    description: 'Chegirma tugash sanasi (ISO formatda)',
  })
  @IsDateString(
    {},
    { message: 'end_date ISO formatdagi sana bo‘lishi kerak (YYYY-MM-DD)' },
  )
  end_date: Date;

  @ApiProperty({ example: 50000, description: 'So‘mdagi chegirma qiymati' })
  @IsNumber({}, { message: 'discount_value raqam bo‘lishi kerak' })
  @Min(0)
  discount_value: number;

  @ApiProperty({
    example: 'https://example.com/discount/abc123',
    description: 'Maxsus havola',
  })
  @IsString({ message: 'special_link matn bo‘lishi kerak' })
  special_link: string;

  @ApiProperty({ example: true, description: 'Chegirma faolmi yoki yo‘q' })
  @IsBoolean({ message: 'is_active faqat true yoki false bo‘lishi kerak' })
  is_active: boolean;

  @ApiProperty({ example: 1, description: 'Do‘kon ID raqami' })
  @IsInt({ message: 'storeId butun son bo‘lishi kerak' })
  storeId: number;

  @ApiProperty({ example: 2, description: 'Kategoriya ID raqami' })
  @IsInt({ message: 'categoryId butun son bo‘lishi kerak' })
  categoryId: number;

  @ApiProperty({ example: 3, description: 'Tur ID raqami' })
  @IsInt({ message: 'typeId butun son bo‘lishi kerak' })
  typeId: number;
}
