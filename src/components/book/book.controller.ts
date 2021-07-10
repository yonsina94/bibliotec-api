import {
  Controller,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import {
  CreateBookDto,
  CreateBookWhitPhotoDto,
  GenderDetail,
} from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
  routes: { exclude: ['createManyBase'] },
})
@ApiTags('book')
@Controller('book')
export class BookController implements CrudController<Book> {
  constructor(
    public service: BookService,
    public genderService: GenderService,
  ) {}

  @Override('createOneBase')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  public async createBook(
    @Body() data: CreateBookWhitPhotoDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const dat: any = data;
    delete dat.photo;

    const gResult: Array<GenderDetail> = [];
    const genders: Array<Gender> = [];

    if (typeof dat.genders === 'string') {
      dat.genders = dat.genders
        .replace(/[\n\t\r]/g, '')
        .replace(/\s+/g, '')
        .trim()
        .split(',');

      dat.genders.forEach((e) => {
        const d = JSON.parse(e);
        gResult.push(d);
      });

      for (const g of gResult) {
        const result = await this.genderService.repo.findOne({
          where: { id: g.genderId },
        });
        if (result) {
          genders.push(result);
        }
      }
    } else {
      for (const g of dat.genders) {
        const result = await this.genderService.repo.findOne({
          where: { id: g['genderId'] },
        });

        if (result) {
          genders.push(result);
        }
      }
    }

    return await this.service.repo.save({
      ...dat,
      coverPageImage: photo.buffer,
      genders,
    });
  }
}
