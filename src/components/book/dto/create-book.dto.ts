import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { WithPhotoDto } from 'src/commons/dto/with-photo.dto';

export class GenderDetail {
  @ApiProperty({ type: String })
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

  @IsArray()
  @Type(() => GenderDetail)
  @ApiProperty({
    type: 'array',
    items: { type: GenderDetail },
    isArray: true,
    require: true,
  })
  public genders: GenderDetail[];
}

export class CreateBookWhitPhotoDto extends IntersectionType(
  CreateBookDto,
  WithPhotoDto,
) {}
