import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Puedes implementar lógica adicional aquí, como verificar roles
    return super.canActivate(context);
  }

  handleRequest<TUser = User>(err: Error | null, user: TUser | false): TUser {
    // Puedes personalizar el manejo de errores
    if (err || !user) {
      throw err || new UnauthorizedException('Acceso no autorizado');
    }
    return user;
  }
}