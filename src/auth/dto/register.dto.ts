import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { IsEqualTo } from 'src/common/decorators/is-equalto';

export class RegisterDto {
  @IsEmail({}, { message: 'Por favor ingresa un email válido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número o carácter especial',
  })
  password: string;

  @IsString({ message: 'La confirmación de contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  @IsEqualTo('password', { message: 'Las contraseñas no coinciden' })
  passwordConfirm: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName: string;
}

// DTO sin passwordConfirm para usar internamente
export type RegisterUserData = Omit<RegisterDto, 'passwordConfirm'>;