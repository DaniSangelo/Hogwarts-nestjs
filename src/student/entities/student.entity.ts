import { House } from 'src/house/entities/house.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstname: string;

  @Column({ default: '' })
  lastname: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  patronus: string;

  @Column({ name: 'houseId', nullable: true })
  houseid: number;

  @ManyToOne(() => House, (house) => house.students)
  @JoinColumn()
  house: House;
}
