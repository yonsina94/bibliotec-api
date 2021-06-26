import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: { type: Gender },
  dto: { create: CreateGenderDto, update: UpdateGenderDto },
  params: {
    ID: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiTags('gender')
@Controller('gender')
export class GenderController implements CrudController<Gender> {
  constructor(public service: GenderService) {}
}
