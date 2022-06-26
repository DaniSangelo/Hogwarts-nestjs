import { Module } from '@nestjs/common';
import { WandService } from './wand.service';
import { WandController } from './wand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wand } from './entities/wand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wand])],
  controllers: [WandController],
  providers: [WandService],
  exports: [WandService],
})
export class WandModule {}
