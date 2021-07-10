import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';

@ApiTags('gender')
@Controller('gender')
export class GenderController {
  constructor(public service: GenderService) {}

  @Get()
  @ApiResponse({ type: [Gender] })
  async getAllGenders() {
    return await this.service.repo.find();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Gender })
  async getGender(@Param('id') id: string) {
    return await this.service.repo.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateGenderDto })
  @ApiResponse({ status: HttpStatus.OK, type: Gender })
  // Data Transfer Object u Objeto de Transferencia de Datos
  async createNewGender(@Body() dto: CreateGenderDto) {
    const ent = this.service.repo.create(dto);

    return await this.service.create(ent);
  }

  @Post('many')
  @ApiBody({ type: [CreateGenderDto] })
  @ApiResponse({ status: HttpStatus.OK, type: [Gender] })
  async createManyGenders(@Body() dto: CreateGenderDto[]) {
    const ent = this.service.repo.create(dto);

    return await this.service.createMany(ent);
  }

  @Put(':id')
  @ApiBody({ type: UpdateGenderDto })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Gender })
  async updateGender(@Body() dto: UpdateGenderDto, @Param('id') id: string) {
    const ent = this.service.repo.create(dto);

    return await this.service.updateByID(id, ent);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean })
  async deleteGender(@Param('id') id: string) {
    return await this.service.deleteByID(id);
  }
}
