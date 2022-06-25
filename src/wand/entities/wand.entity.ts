import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
