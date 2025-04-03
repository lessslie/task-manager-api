import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'Número de página (empieza en 1)',
    default: 1,
    required: false,
    minimum: 1
  })
  @IsOptional()
  @IsInt({ message: 'La página debe ser un número entero' })
  @Min(1, { message: 'La página debe ser mayor o igual a 1' })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'Número de elementos por página',
    default: 10,
    required: false,
    minimum: 1,
    maximum: 100
  })
  @IsOptional()
  @IsInt({ message: 'El límite debe ser un número entero' })
  @Min(1, { message: 'El límite debe ser mayor o igual a 1' })
  @Max(100, { message: 'El límite debe ser menor o igual a 100' })
  @Type(() => Number)
  limit?: number = 10;
}