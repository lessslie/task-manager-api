# Task Manager API

Una API RESTful para gestión de tareas personales desarrollada con NestJS, TypeScript, PostgreSQL y Docker.

## Características

- 🔐 **Autenticación**: Registro e inicio de sesión de usuarios con JWT
- 👤 **Usuarios**: Gestión de perfiles y datos personales
- ✅ **Tareas**: Creación, lectura, actualización y eliminación de tareas
- 🔍 **Filtrado**: Búsqueda por estado, prioridad, fechas y texto
- 📄 **Paginación**: Control del número de resultados y navegación por páginas
- 📊 **Swagger**: Documentación completa de la API
- 🐳 **Docker**: Configuración lista para desarrollo y producción

## Estructura del Proyecto

```
task-manager-api/
├── src/
│   ├── auth/          # Autenticación (registro, login, JWT)
│   ├── users/         # Gestión de usuarios
│   ├── tasks/         # Gestión de tareas
│   ├── health/        # Endpoint de estado de la API
│   ├── common/        # Utilidades compartidas
│   ├── app.module.ts  # Módulo principal
│   └── main.ts        # Punto de entrada
├── docker/            # Configuración de Docker
├── Dockerfile         # Definición de imagen Docker
├── docker-compose.yml # Orquestación de contenedores
└── ...
```

## Requisitos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/)
- [PostgreSQL](https://www.postgresql.org/) (si se ejecuta sin Docker)

## Uso con Docker (recomendado)

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/task-manager-api.git
   cd task-manager-api
   ```

2. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   # Editar .env según tus necesidades
   ```

3. **Iniciar la aplicación**

   ```bash
   docker-compose up -d
   ```

4. **Verificar que la aplicación está funcionando**

   ```bash
   curl http://localhost:3000/api/health
   ```

5. **Ver la documentación de la API**

   Abre en tu navegador: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Uso sin Docker

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   # Editar .env según tus necesidades
   ```

3. **Iniciar la aplicación**

   ```bash
   npm run start:dev
   ```

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar un nuevo usuario
- `POST /api/auth/login` - Iniciar sesión y obtener token JWT

### Usuarios

- `GET /api/users/profile` - Obtener perfil del usuario actual
- `PATCH /api/users/:id` - Actualizar datos de usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Tareas

- `GET /api/tasks` - Listar tareas (con filtros y paginación)
- `POST /api/tasks` - Crear una nueva tarea
- `GET /api/tasks/:id` - Obtener una tarea específica
- `PATCH /api/tasks/:id` - Actualizar una tarea
- `DELETE /api/tasks/:id` - Eliminar una tarea
- `PATCH /api/tasks/:id/status` - Actualizar estado de una tarea

### Estado

- `GET /api/health` - Verificar estado de la API

## Ejemplos de Uso

### Registro de Usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "Contraseña123",
    "passwordConfirm": "Contraseña123",
    "firstName": "Nombre",
    "lastName": "Apellido"
  }'
```

### Inicio de Sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "Contraseña123"
  }'
```

### Crear Tarea (con token JWT)

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token_jwt>" \
  -d '{
    "title": "Implementar autenticación",
    "description": "Implementar JWT en la API",
    "priority": "high",
    "dueDate": "2025-12-31T23:59:59.999Z"
  }'
```

## Despliegue en Producción

Para desplegar en producción, puedes usar el Dockerfile multi-etapa:

```bash
# Construir la imagen de producción
docker build -t task-manager-api:prod --target production .

# Ejecutar el contenedor
docker run -p 3000:3000 --env-file .env.prod task-manager-api:prod
```

## Desarrollo

### Comandos útiles

```bash
# Iniciar en modo desarrollo
npm run start:dev

# Ejecutar linting
npm run lint

# Ejecutar pruebas
npm run test

# Ejecutar pruebas e2e
npm run test:e2e

# Compilar la aplicación
npm run build
```

### Base de datos

La aplicación utiliza TypeORM con PostgreSQL. La sincronización automática de esquema está habilitada en desarrollo (`DB_SYNC=true`), pero se recomienda usar migraciones en producción.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.