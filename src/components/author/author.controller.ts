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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Request as Req } from 'express';

import { AuthorService } from './author.service';
import {
  CreateAuthorDto,
  CreateAuthorWhitPhotoDto,
} from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Crud({
  model: { type: Author },
  dto: { create: CreateAuthorDto, update: UpdateAuthorDto },
  params: {
    ID: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiTags('author')
@Controller('author')
export class AuthorController implements CrudController<Author> {
  constructor(public service: AuthorService) {}

  @Override('createOneBase')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  public async postSaveNewAutor(
    @Body() data: CreateAuthorWhitPhotoDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const dat: any = data;
    delete dat.photo;
    return await this.service.repo.save({ ...dat, photo: photo.buffer });
  }
}
