import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialMediaTypeDto {
  @ApiProperty({ example: 'https://t.me', description: 'Ijtimoiy tarmoq manzili' })
  @IsString({ message: 'based_url satr bo‘lishi kerak' })
  based_url: string;

  @ApiProperty({ example: true, description: 'Faollik holati' })
  @IsBoolean({ message: 'is_activa true yoki false bo‘lishi kerak' })
  is_activa: boolean;
}
