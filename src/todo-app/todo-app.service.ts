import { Injectable } from '@nestjs/common';
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
        return await this.todoRepository.findOne({where: {id}});
    }

    async addNew(data: TodoDTO) {
        const todo = await this.todoRepository.create(data)
        await this.todoRepository.save(todo)
        return todo;
    }

    async updateTask(id: number, data: TodoDTO) {
        await this.todoRepository.update({id}, data);
        return await this.todoRepository.findOne({id});
    }

    async deleteTask(id: number) {
        await this.todoRepository.delete({id});
        return {deleted: true};
    }
}
