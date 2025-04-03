import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class FilterTasksDto {
  @ApiProperty({
    description: 'Filtrar por estado de la tarea',
    enum: TaskStatus,
    required: false
  })
  @IsEnum(TaskStatus, { message: 'El estado debe ser uno de los siguientes valores: todo, in_progress, done' })
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({
    description: 'Filtrar por prioridad de la tarea',
    enum: TaskPriority,
    required: false
  })
  @IsEnum(TaskPriority, { message: 'La prioridad debe ser una de las siguientes: low, medium, high' })
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    description: 'Filtrar tareas con fecha límite antes de esta fecha',
    example: '2025-12-31T23:59:59.999Z',
    required: false
  })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  @IsOptional()
  dueDateBefore?: string;

  @ApiProperty({
    description: 'Filtrar tareas con fecha límite después de esta fecha',
    example: '2025-01-01T00:00:00.000Z',
    required: false
  })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  @IsOptional()
  dueDateAfter?: string;

  @ApiProperty({
    description: 'Buscar texto en título o descripción',
    example: 'API',
    required: false
  })
  @IsOptional()
  search?: string;
}
