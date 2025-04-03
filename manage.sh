#!/bin/bash
set -e

# Colores para salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
  echo -e "${GREEN}Task Manager API - Script de gestión${NC}"
  echo ""
  echo "Uso: ./manage.sh [comando]"
  echo ""
  echo "Comandos disponibles:"
  echo "  start            Inicia los contenedores Docker"
  echo "  stop             Detiene los contenedores Docker"
  echo "  restart          Reinicia los contenedores Docker"
  echo "  logs             Muestra los logs de la aplicación"
  echo "  build            Construye la imagen Docker"
  echo "  status           Muestra el estado de los contenedores"
  echo "  shell            Abre un shell en el contenedor de la API"
  echo "  db-shell         Abre un shell en PostgreSQL"
  echo "  test             Ejecuta las pruebas unitarias"
  echo "  test:e2e         Ejecuta las pruebas e2e"
  echo "  lint             Ejecuta el linter"
  echo "  update-deps      Actualiza las dependencias"
  echo "  help             Muestra este mensaje de ayuda"
  echo ""
}

# Verificar si Docker y Docker Compose están instalados
check_requirements() {
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker no está instalado.${NC}"
    exit 1
  fi

  if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker Compose no está instalado.${NC}"
    exit 1
  fi
}

# Función principal
main() {
  # Verificar requisitos
  check_requirements

  # Si no se proporciona un comando, mostrar ayuda
  if [ $# -eq 0 ]; then
    show_help
    exit 0
  fi

  # Procesar el comando
  case "$1" in
    start)
      echo -e "${GREEN}Iniciando contenedores...${NC}"
      docker-compose up -d
      echo -e "${GREEN}Contenedores iniciados exitosamente.${NC}"
      echo -e "API: ${YELLOW}http://localhost:3000/api${NC}"
      echo -e "Docs: ${YELLOW}http://localhost:3000/api/docs${NC}"
      echo -e "PostgreSQL: ${YELLOW}localhost:5432${NC}"
      echo -e "PgAdmin: ${YELLOW}http://localhost:5050${NC}"
      ;;
    stop)
      echo -e "${GREEN}Deteniendo contenedores...${NC}"
      docker-compose down
      echo -e "${GREEN}Contenedores detenidos exitosamente.${NC}"
      ;;
    restart)
      echo -e "${GREEN}Reiniciando contenedores...${NC}"
      docker-compose down
      docker-compose up -d
      echo -e "${GREEN}Contenedores reiniciados exitosamente.${NC}"
      ;;
    logs)
      docker-compose logs -f api
      ;;
    build)
      echo -e "${GREEN}Construyendo imagen Docker...${NC}"
      docker-compose build
      echo -e "${GREEN}Imagen construida exitosamente.${NC}"
      ;;
    status)
      echo -e "${GREEN}Estado de los contenedores:${NC}"
      docker-compose ps
      ;;
    shell)
      echo -e "${GREEN}Abriendo shell en el contenedor de la API...${NC}"
      docker-compose exec api sh
      ;;
    db-shell)
      echo -e "${GREEN}Abriendo shell en PostgreSQL...${NC}"
      docker-compose exec postgres psql -U postgres -d task_manager
      ;;
    test)
      echo -e "${GREEN}Ejecutando pruebas unitarias...${NC}"
      docker-compose exec api npm run test
      ;;
    test:e2e)
      echo -e "${GREEN}Ejecutando pruebas e2e...${NC}"
      docker-compose exec api npm run test:e2e
      ;;
    lint)
      echo -e "${GREEN}Ejecutando linter...${NC}"
      docker-compose exec api npm run lint
      ;;
    update-deps)
      echo -e "${GREEN}Actualizando dependencias...${NC}"
      docker-compose exec api npm update
      echo -e "${GREEN}Dependencias actualizadas exitosamente.${NC}"
      ;;
    help)
      show_help
      ;;
    *)
      echo -e "${RED}Comando desconocido: $1${NC}"
      show_help
      exit 1
      ;;
  esac
}

# Ejecutar la función principal con todos los argumentos
main "$@"