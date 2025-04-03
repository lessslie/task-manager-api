# Task Manager API

Una API RESTful para gestionar tareas con autenticación de usuarios, desarrollada con NestJS, TypeScript, TypeORM y PostgreSQL.

## Características

- 🔐 Autenticación completa con JWT
- 👤 Gestión de usuarios (registro, login, perfil)
- ✅ CRUD de tareas con prioridades y estados
- 📝 Asignación de tareas a usuarios
- 📊 Filtrado de tareas por estado, prioridad y fecha
- 📚 Documentación completa con Swagger

## Tecnologías

- **Backend**: NestJS, TypeScript, Node.js
- **Base de datos**: PostgreSQL, TypeORM
- **Autenticación**: JWT, Passport.js
- **Validación**: class-validator, class-transformer
- **Documentación**: Swagger/OpenAPI
- **Containerización**: Docker, Docker Compose

## Estructura del Proyecto

El proyecto sigue la arquitectura modular de NestJS:

- `src/auth`: Módulo de autenticación (registro, login)
- `src/users`: Gestión de usuarios
- `src/tasks`: Gestión de tareas
- `src/config`: Configuración de la aplicación

## Instalación y Ejecución

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- PostgreSQL o Docker

### Usando npm

```bash
# Clonar el repositorio
git clone https://github.com/leeeslie/task-manager-api.git
cd task-manager-api

# Instalar dependencias
npm install

# Configuración
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar en desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm run start:prod
```

### Usando Docker

```bash
# Clonar el repositorio
git clone https://github.com/leeeslie/task-manager-api.git
cd task-manager-api

# Configuración
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar con Docker Compose
docker-compose up -d
```

## API Endpoints

La documentación completa está disponible en Swagger UI: `/api/docs`

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión y obtener token JWT

### Usuarios

- `GET /api/users/profile` - Obtener perfil del usuario actual
- `PATCH /api/users/:id` - Actualizar datos de usuario

### Tareas

- `GET /api/tasks` - Listar tareas del usuario
- `POST /api/tasks` - Crear nueva tarea
- `GET /api/tasks/:id` - Ver detalles de una tarea
- `PATCH /api/tasks/:id` - Actualizar una tarea
- `DELETE /api/tasks/:id` - Eliminar una tarea
- `PATCH /api/tasks/:id/status` - Actualizar estado de una tarea

## Contribución

- Las contribuciones son bienvenidas. Para cambios importantes, por favor abra primero un issue para discutir lo que le gustaría cambiar.
  