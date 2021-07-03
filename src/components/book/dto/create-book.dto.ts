import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { WithPhotoDto } from 'src/commons/dto/with-photo.dto';

export class GenderDetail {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  genderId: string;
}

export class CreateBookDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public year: number;

  @ApiProperty()
  public authorId: string;

  @ApiProperty({ type: [GenderDetail] })
  public genders: Array<GenderDetail>;
}

export class CreateBookWhitPhotoDto extends IntersectionType(CreateBookDto, WithPhotoDto) { }