import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Estado actual de la tarea',
    enum: TaskStatus,
    required: false
  })
  @IsEnum(TaskStatus, { message: 'El estado debe ser uno de los siguientes valores: todo, in_progress, done' })
  @IsOptional()
  status?: TaskStatus;
}