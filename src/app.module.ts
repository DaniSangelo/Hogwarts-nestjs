import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readdirSync } from 'fs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseModule } from './house/house.module';
import { StudentModule } from './student/student.module';
import { WandModule } from './wand/wand.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'daniel',
      database: 'dbhogwarts',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      cache: {
        type: 'redis',
        options: {
          host: 'localhost',
          port: 6379,
        }
      }
    }),
    HouseModule,
    StudentModule,
    WandModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
