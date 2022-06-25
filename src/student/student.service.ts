import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import internal from 'stream';
import { EntityManager, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private manager: EntityManager,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const result = await this.studentRepository.findOne({
      where: { id },
      relations: ['wand', 'house'],
    });

    const { wandid, houseid, ...student } = result;

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.preload({
      id,
      ...updateStudentDto,
    });

    if (!student) throw new NotFoundException('Student not found');

    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOne({ where: { id: id } });

    if (!student) throw new NotFoundException('Student not found');

    return this.studentRepository.remove(student);
  }

  async listStudents(idStart: number, idEnd: number) {
    const students = await this.manager.query('CALL list_students(?, ?)', [
      idStart,
      idEnd,
    ]);
    return students[0];
  }
}
