import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WandService } from './wand.service';
import { CreateWandDto } from './dto/create-wand.dto';
import { UpdateWandDto } from './dto/update-wand.dto';

@Controller('wand')
export class WandController {
  constructor(private readonly wandService: WandService) {}

  @Get()
  findAll() {
    return this.wandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWandDto: UpdateWandDto) {
    return this.wandService.update(+id, updateWandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wandService.remove(+id);
  }
}
