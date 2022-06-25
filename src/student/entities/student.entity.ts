import { House } from 'src/house/entities/house.entity';
import { Wand } from 'src/wand/entities/wand.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @Column({ name: 'wandId', nullable: true })
  wandid: number;

  @ManyToOne(() => House, (house) => house.students)
  @JoinColumn()
  house: House;

  @OneToOne(() => Wand, (wand) => wand.id, { cascade: true, nullable: true })
  @JoinColumn()
  wand: Wand;
}
