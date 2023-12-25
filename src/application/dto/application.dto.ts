import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreatePermissionDto {
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '{operation|function}:{read}' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;
}

export class UpdatePermissionDto {
  // @IsNotEmpty()
  // @IsNumber({}, { always: true })
  // id: number;

  @ApiProperty({ example: '{operation|function}:{read}' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;
}
