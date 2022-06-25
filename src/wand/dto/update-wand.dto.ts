import { PartialType } from '@nestjs/mapped-types';
import { CreateWandDto } from './create-wand.dto';

export class UpdateWandDto extends PartialType(CreateWandDto) {}
