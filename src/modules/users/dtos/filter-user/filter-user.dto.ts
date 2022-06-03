import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterUserDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  readonly limit?: number;
}
