import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Implementar autenticación JWT'
  })
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @ApiProperty({
    description: 'Descripción detallada de la tarea',
    example: 'Investigar e implementar autenticación JWT con Passport en NestJS',
    required: false
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Estado actual de la tarea',
    enum: TaskStatus,
    default: TaskStatus.TODO,
    required: false
  })
  @IsEnum(TaskStatus, { message: 'El estado debe ser uno de los siguientes valores: todo, in_progress, done' })
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({
    description: 'Prioridad de la tarea',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
    required: false
  })
  @IsEnum(TaskPriority, { message: 'La prioridad debe ser una de las siguientes: low, medium, high' })
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    description: 'Fecha límite para completar la tarea',
    example: '2025-12-31T23:59:59.999Z',
    required: false
  })
  @IsDateString({}, { message: 'La fecha límite debe ser una fecha válida' })
  @IsOptional()
  dueDate?: string;
}
