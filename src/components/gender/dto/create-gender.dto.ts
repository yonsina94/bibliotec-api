import { ApiProperty } from '@nestjs/swagger';

export class CreateGenderDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string;
}
