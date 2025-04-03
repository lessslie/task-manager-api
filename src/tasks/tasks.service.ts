import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { FilterTasksDto } from './dto/filter-task.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { PaginationDto } from 'src/common/dto/pagination';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId: user.id,
      user: user,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(
    userId: string, 
    filterDto?: FilterTasksDto,
    paginationDto?: PaginationDto
  ): Promise<PaginatedResponse<Task>> {
    const query = this.tasksRepository.createQueryBuilder('task')
      .where('task.userId = :userId', { userId });

    if (filterDto) {
      // Filtrar por estado
      if (filterDto.status) {
        query.andWhere('task.status = :status', { status: filterDto.status });
      }

      // Filtrar por prioridad
      if (filterDto.priority) {
        query.andWhere('task.priority = :priority', { priority: filterDto.priority });
      }

      // Filtrar por fecha límite antes de
      if (filterDto.dueDateBefore) {
        query.andWhere('task.dueDate <= :dueDateBefore', { 
          dueDateBefore: new Date(filterDto.dueDateBefore) 
        });
      }

      // Filtrar por fecha límite después de
      if (filterDto.dueDateAfter) {
        query.andWhere('task.dueDate >= :dueDateAfter', { 
          dueDateAfter: new Date(filterDto.dueDateAfter) 
        });
      }

      // Búsqueda por texto en título o descripción
      if (filterDto.search) {
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          { search: `%${filterDto.search}%` }
        );
      }
    }

    // Ordenar por fecha de creación (más reciente primero)
    query.orderBy('task.createdAt', 'DESC');

    // Calcular el total de elementos
    const totalItems = await query.getCount();

    // Configurar paginación
    const { page = 1, limit = 10 } = paginationDto || {};
    const skip = (page - 1) * limit;
    
    query.skip(skip).take(limit);

    // Obtener los resultados paginados
    const items = await query.getMany();

    // Calcular el total de páginas
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    // Verificar que la tarea pertenezca al usuario
    if (task.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta tarea',
      );
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    // Primero verificamos que la tarea exista y pertenezca al usuario
    await this.findOne(id, userId);

    // Actualizar la tarea
    await this.tasksRepository.update({ id, userId }, updateTaskDto);

    // Devolver la tarea actualizada
    return this.findOne(id, userId);
  }

  async updateStatus(
    id: string,
    status: TaskStatus,
    userId: string,
  ): Promise<Task> {
    // Primero verificamos que la tarea exista y pertenezca al usuario
    await this.findOne(id, userId);

    // Actualizar solo el estado
    await this.tasksRepository.update({ id, userId }, { status });

    // Devolver la tarea actualizada
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    // Primero verificamos que la tarea exista y pertenezca al usuario
    await this.findOne(id, userId);

    // Eliminar la tarea
    await this.tasksRepository.delete({ id, userId });
  }
}
