import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @ManyToMany(() => Student, (student) => student.subjects, { cascade: true })
  students: Student[];
}
