import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  create(createHouseDto: CreateHouseDto) {
    const house = this.houseRepository.create(createHouseDto);
    return this.houseRepository.save(house);
  }

  findAll() {
    return this.houseRepository.find();
  }

  findOne(id: number) {
    return this.houseRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    const house = await this.houseRepository.preload({ id, ...updateHouseDto });

    if (!house) throw new NotFoundException('House not found');

    return this.houseRepository.save(house);
  }

  async remove(id: number) {
    const house = await this.houseRepository.findOne({ where: { id: id } });

    if (!house) throw new NotFoundException('House not found');

    return this.houseRepository.remove(house);
  }
}
