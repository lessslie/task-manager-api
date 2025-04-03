// Interfaces compartidas para autenticación

// Respuesta al registrar un usuario
export interface UserResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Respuesta al iniciar sesión
  export interface LoginResponse {
    access_token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }
  
  // Payload del JWT
  export interface JwtPayload {
    sub: string;
    email: string;
  }