import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoDTO } from './models/todo-app.dto';
import { TodoAppService } from './todo-app.service';

@Controller('todo-app')
export class TodoAppController {

    constructor(private todoService: TodoAppService) {}

    @Get()
    @ApiTags('todo-app')
    getTasks() {
        return this.todoService.getTasks();
    }

    @Get(':id')
    @ApiTags('todo-app')
    getTaskById(@Param('id') id: number) {
        return this.todoService.getTaskById(id);
    }

    @Post()
    @ApiTags('todo-app')
    addNew(@Body() data: TodoDTO) {
        return this.todoService.addNew(data);
    }

    @Put('update/:id')
    @ApiTags('todo-app')
    updateTask(@Param('id') id: number, @Body() data: TodoDTO) {
        return this.todoService.updateTask(id, data);
    }

    @Delete('delets/:id')
    @ApiTags('todo-app')
    deleteTask(@Param('id') id: number) {
        return this.todoService.deleteTask(id)
    }
}
