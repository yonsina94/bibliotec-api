import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { GenderModule } from '../gender/gender.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), GenderModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
