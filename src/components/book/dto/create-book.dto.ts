import { ApiPropertyOptional } from "@nestjs/swagger";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GengerDetail {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  gengerId: string
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

  @ApiPropertyOptional({ type: 'file' })
  public coverPageImage?: Express.Multer.File;


  @ApiProperty({ type: [GengerDetail] })
  public gengers: Array<GengerDetail>;
}
