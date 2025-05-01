import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { District } from './models/district.model';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Yangi district yaratish' })
  @ApiResponse({
    status: 201,
    description: 'District yaratildi',
    type: District,
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'Barcha districtlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Districtlar ro‘yxati',
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'Districtni ID orqali olish' })
  @ApiParam({ name: 'id', type: Number, description: 'District ID raqami' })
  @ApiResponse({
    status: 200,
    description: 'Topilgan district',
    type: District,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: 'Districtni yangilash' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Yangilanishi kerak bo‘lgan district ID',
  })
  @ApiResponse({
    status: 200,
    description: 'District yangilandi',
    type: District,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'Districtni o‘chirish' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'O‘chiriladigan district ID',
  })
  @ApiResponse({ status: 200, description: 'District o‘chirildi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
