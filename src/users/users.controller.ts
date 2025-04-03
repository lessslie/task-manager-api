import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';

// Tipo para la request con usuario autenticado
interface RequestWithUser extends Request {
  user: User;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios (sólo para pruebas, se debería restringir a admins)
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  // Obtener perfil del usuario actual
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: RequestWithUser) {
    // req.user viene del JwtAuthGuard
    return req.user;
  }

  // Obtener un usuario por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    // Solo permite ver perfil propio, a menos que implementes roles
    if (req.user.id !== id) {
      throw new ForbiddenException('No puedes acceder a perfiles de otros usuarios');
    }

    return this.usersService.findOne(id);
  }

  // Actualizar usuario
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: RequestWithUser,
  ) {
    // Solo permite actualizar perfil propio
    if (req.user.id !== id) {
      throw new ForbiddenException('No puedes modificar perfiles de otros usuarios');
    }
    
    return this.usersService.update(id, updateUserDto);
  }

  // Eliminar usuario (desactivar)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    // Solo permite eliminar perfil propio
    if (req.user.id !== id) {
      throw new ForbiddenException('No puedes eliminar perfiles de otros usuarios');
    }
    
    // Aquí podrías optar por desactivar en lugar de eliminar completamente
    await this.usersService.remove(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}