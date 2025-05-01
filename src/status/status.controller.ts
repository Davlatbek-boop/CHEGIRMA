import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Status } from './models/status.model';

@ApiTags('Status') // Swagger UI bo‘lim nomi
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Yangi status yaratish' })
  @ApiResponse({ status: 201, description: 'Status yaratildi', type: Status })
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Barcha statuslarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Statuslar ro‘yxati',
    type: [Status],
  })
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'Statusni ID orqali olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Status ID raqami' })
  @ApiResponse({ status: 200, description: 'Topilgan status', type: Status })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Statusni yangilash' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Yangilanishi kerak bo‘lgan status ID',
  })
  @ApiResponse({ status: 200, description: 'Status yangilandi', type: Status })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Statusni o‘chirish' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'O‘chiriladigan status ID',
  })
  @ApiResponse({ status: 200, description: 'Status o‘chirildi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
