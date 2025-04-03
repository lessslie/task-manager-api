import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TaskStatus } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { FilterTasksDto } from './dto/filter-task.dto';
import { PaginationDto } from 'src/common/dto/pagination';

// Interface para request con usuario autenticado
interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas obtenida exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll(
    @Request() req: RequestWithUser,
    @Query() filterDto: FilterTasksDto,
    @Query() paginationDto: PaginationDto,
  ) {
    // Pasamos paginationDto al servicio
    return this.tasksService.findAll(req.user.id, filterDto, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No es tu tarea' })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Estado de tarea actualizado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No es tu tarea' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
    @Request() req: RequestWithUser,
  ) {
    return this.tasksService.updateStatus(id, status, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({ status: 204, description: 'Tarea eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No es tu tarea' })
  async remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    await this.tasksService.remove(id, req.user.id);
  }
}
