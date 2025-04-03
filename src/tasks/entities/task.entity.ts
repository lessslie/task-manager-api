import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    CreateDateColumn, 
    UpdateDateColumn,
    JoinColumn
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
  }
  
  export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
  }
  
  @Entity('tasks')
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.TODO,
    })
    status: TaskStatus;
  
    @Column({
      type: 'enum',
      enum: TaskPriority,
      default: TaskPriority.MEDIUM,
    })
    priority: TaskPriority;
  
    @Column({ nullable: true })
    dueDate: Date;
  
    @Column({ nullable: false })
    userId: string;
  
    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
