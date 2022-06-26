import { Subject } from 'src/subject/entities/subject.entity';
import { Wand } from 'src/wand/entities/wand.entity';

export class CreateStudentDto {
  firstname: string;
  lastname: string;
  birthdate: Date;
  patronus: string;
  houseId: number;
  wand?: Wand;
  subjects?: Subject[];
}
