import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/shared/api-result';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ValidationPipe } from 'src/shared/validator.pipe';
import { TodoDTO } from './models/todo-app.dto';
import { TodoAppService } from './todo-app.service';

@Controller('todo-app')
@ApiTags('todo-app')
export class TodoAppController {

    constructor(private todoService: TodoAppService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async getTasks() {
        return (new ApiResult).success(await this.todoService.getTasks());
    }

    @Get(':id')
    
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async getTaskById(@Param('id') id: number) {
        return (new ApiResult).success(await this.todoService.getTaskById(id));
    }

    @Post('/add-new')
    @UsePipes(new ValidationPipe())
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async addNew(@Body() data: TodoDTO) {
        return (new ApiResult).success(await this.todoService.addNew(data));
    }

    @Put('update/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    @ApiBearerAuth()
    async updateTask(@Param('id') id: number, @Body() data: TodoDTO) {
        return (new ApiResult).success(await this.todoService.updateTask(id, data));
    }

    @Delete('delete/:id')
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async deleteTask(@Param('id') id: number) {
        return (new ApiResult).success(await this.todoService.deleteTask(id))
    }
}
