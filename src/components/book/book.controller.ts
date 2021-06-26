import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: { type: Book },
  dto: { create: CreateBookDto, update: UpdateBookDto },
  params: {
    ID: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiTags('book')
@Controller('book')
export class BookController implements CrudController<Book> {
  constructor(public service: BookService) {}
}
