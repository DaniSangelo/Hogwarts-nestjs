import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWandDto } from './dto/create-wand.dto';
import { UpdateWandDto } from './dto/update-wand.dto';
import { Wand } from './entities/wand.entity';

@Injectable()
export class WandService {
  constructor(
    @InjectRepository(Wand)
    private readonly wandRepository: Repository<Wand>,
  ) {}

  findAll() {
    return this.wandRepository.find();
  }

  findOne(id: number) {
    return this.wandRepository.findOne({ where: { id } });
  }

  async update(id: number, updateWandDto: UpdateWandDto) {
    const wand = await this.wandRepository.preload({ id, ...updateWandDto });

    if (!wand) throw new NotFoundException('Wand not fount');

    return this.wandRepository.save(wand);
  }

  async remove(id: number) {
    const wand = await this.wandRepository.findOne({ where: { id } });

    if (!wand) throw new NotFoundException('Wand not fount');

    return this.wandRepository.remove(wand);
  }
}
