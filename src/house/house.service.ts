import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getRepository, Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { Student } from '../student/entities/student.entity';
import { Wand } from 'src/wand/entities/wand.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    private manager: EntityManager,
  ) {}

  create(createHouseDto: CreateHouseDto) {
    const house = this.houseRepository.create(createHouseDto);
    return this.houseRepository.save(house);
  }

  findAll() {
    return this.houseRepository.find();
  }

  async findAllStudentsOfHouse() {
    const houses = await this.manager
      .createQueryBuilder()
      .from(House, 'house')
      .leftJoinAndSelect(Student, 'student', 'house.id = student.houseid')
      .leftJoinAndSelect(Wand, 'wand', 'student.wandid = wand.id')
      .select([
        'house.id AS houseId, house.name AS house',
        "CONCAT(student.firstname, ' ', student.lastname) AS student",
        'wand.*',
      ])
      .cache('houses', 60000)
      .getRawMany();

    return houses;
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
