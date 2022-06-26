import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  core: string;

  @Column()
  material: string;

  @Column()
  size: number;

  @Column()
  flexibility: string;

  @Column({ name: 'studentId', nullable: true })
  studentid: number;

  @OneToOne(() => Student, (student) => student.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  student: Student;
}
