import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectService } from 'src/subject/subject.service';
import { WandService } from 'src/wand/wand.service';
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
    private readonly subjectService: SubjectService,
    private readonly wandService: WandService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const subjects =
      createStudentDto?.subjects &&
      (await Promise.all(
        createStudentDto.subjects.map((subject) =>
          this.preloadSubjectByName(subject.name),
        ),
      ));

    let student = this.studentRepository.create({
      ...createStudentDto,
      subjects,
    });

    student = await this.studentRepository.save(student);
    if (student.id && createStudentDto?.wand){
      let wand = { ...createStudentDto?.wand }
      wand.studentid = student.id;
      wand = await this.wandService.create(wand);
    }
    return student;
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const result = await this.studentRepository.findOne({
      where: { id },
      relations: ['house'],
    });

    const { houseid, ...student } = result;

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

  private async preloadSubjectByName(name: string) {
    const subject = await this.subjectService.findByName(name);

    if (!subject) return this.subjectService.create({ name });

    return subject;
  }
}
