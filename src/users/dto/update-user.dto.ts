import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Por favor ingresa un email válido' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsOptional()
  lastName?: string;

  @IsBoolean({ message: 'El estado debe ser un valor booleano' })
  @IsOptional()
  isActive?: boolean;

  // Opcional: si quieres permitir cambiar la contraseña
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password?: string;

  // Opcional: si quieres verificar la contraseña actual antes de actualizar
  @IsString()
  @IsOptional()
  currentPassword?: string;
}