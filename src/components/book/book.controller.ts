import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Request,
  UploadedFile,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { CreateBookDto, CreateBookWhitPhotoDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as Req } from 'express';
import { WithPhotoDto } from 'src/commons/dto/with-photo.dto';
import { GenderService } from '../gender/gender.service';
import { Gender } from '../gender/entities/gender.entity';

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
  constructor(public service: BookService, public genderService: GenderService) { }

  @Override('createOneBase')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  public async createBook(@Body() data: CreateBookWhitPhotoDto, @UploadedFile() photo: Express.Multer.File) {
    const dat: any = data;
    delete dat.photo;

    let genders: Array<Gender>

    for (const g of data.genders) {
      const result = await this.genderService.repo.findOne(g.genderId)
      if (result) {
        genders.push(result)
      }
    }

    return await this.service.repo.save({ ...dat, coverPageImage: photo.buffer })
  }
}
