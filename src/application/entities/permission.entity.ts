import { IsOptional, IsDefined, IsString, IsNumber } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Permission {
  // @ApiProperty({ example: 1 })
  @IsOptional({ always: true })
  // @IsDefined({ groups: [UPDATE] })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test:read' })
  // @IsDefined({ groups: [CREATE, UPDATE] })
  @IsString()
  @Column({ type: String })
  name: string;

  @ApiProperty({ example: 'Read Test' })
  // @IsDefined({ groups: [CREATE, UPDATE] })
  @IsString()
  @Column({ type: String, nullable: true })
  description?: string;
}
