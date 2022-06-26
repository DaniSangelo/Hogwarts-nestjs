import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SubjectService } from 'src/subject/subject.service';
import { Subject } from 'src/subject/entities/subject.entity';
import { WandService } from 'src/wand/wand.service';
import { Wand } from 'src/wand/entities/wand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Subject, Wand])],
  controllers: [StudentController],
  providers: [StudentService, SubjectService, WandService],
})
export class StudentModule {}
