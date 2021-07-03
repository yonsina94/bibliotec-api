import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class WithPhotoDto {
  @ApiPropertyOptional({ type: 'file' })
  public photo?: Express.Multer.File;
}

export class CreateAuthorDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public birthDate: Date;

  @ApiProperty()
  public nationality: string;

  @ApiProperty()
  public genger: string;

  @ApiProperty()
  public maritalStatus?: string;

  @ApiProperty()
  public biographyUrl?: string;

  @ApiPropertyOptional()
  public email?: string;

  @ApiPropertyOptional()
  public phoneNumber?: string;
}

export class CreateAuthorWhitPhotoDto extends IntersectionType(
  CreateAuthorDto,
  WithPhotoDto,
) {}
