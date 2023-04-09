import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readdirSync } from 'fs';
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
      database: 'hogwarts',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
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
  controllers: [],
  providers: [],
})
export class AppModule {}
