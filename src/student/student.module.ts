import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SubjectService } from 'src/subject/subject.service';
import { Subject } from 'src/subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Subject])],
  controllers: [StudentController],
  providers: [StudentService, SubjectService],
})
export class StudentModule {}
