FROM node:18-alpine AS development

# Instalar dependencias necesarias
RUN apk add --no-cache python3 make g++

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de configuración
COPY package*.json tsconfig*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM node:18-alpine AS production

# Configuración de entorno
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar la aplicación compilada
COPY --from=development /usr/src/app/dist ./dist

# Puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]