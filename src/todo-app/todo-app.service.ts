import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDTO } from './models/todo-app.dto';
import { TodoEntity } from './todo-app.entity';

@Injectable()
export class TodoAppService {
    constructor(@InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>) {}

    async getTasks() {
        return await this.todoRepository.find(); 
    }

    async getTaskById(id: number) {
        const todo = await this.todoRepository.findOne({where: {id}});
        if (!todo) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        return todo;
    }

    async addNew(data: TodoDTO) {
        const todo = await this.todoRepository.create(data)
        await this.todoRepository.save(todo)
        return todo;
    }

    async updateTask(id: number, data: TodoDTO) {
        const todo = await this.todoRepository.findOne({where: {id}});
        if (!todo) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.todoRepository.update({id}, data);
        return todo;
    }

    async deleteTask(id: number) {
        const todo = await this.todoRepository.findOne({where: {id}});
        if (!todo) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        await this.todoRepository.delete({id});
        return todo;
    }
}
