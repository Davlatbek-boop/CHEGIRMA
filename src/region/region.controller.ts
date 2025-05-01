import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Region } from './models/region.model';

@ApiTags('Region') // Swagger UI'da bo‘lim nomi
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Yangi region yaratish' })
  @ApiResponse({ status: 201, description: 'Region yaratildi', type: Region })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Barcha regionlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha regionlar', type: [Region] })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Regionni ID orqali olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Region IDsi' })
  @ApiResponse({ status: 200, description: 'Topilgan region', type: Region })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Regionni yangilash' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Yangilanishi kerak bo‘lgan region IDsi',
  })
  @ApiResponse({ status: 200, description: 'Region yangilandi', type: Region })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Regionni o‘chirish' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'O‘chiriladigan region IDsi',
  })
  @ApiResponse({ status: 200, description: 'Region o‘chirildi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
