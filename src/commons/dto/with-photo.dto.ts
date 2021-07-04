import { ApiPropertyOptional } from '@nestjs/swagger';

export class WithPhotoDto {
  @ApiPropertyOptional({ type: 'file' })
  public photo?: Express.Multer.File;
}
