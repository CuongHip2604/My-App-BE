import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiResult } from 'src/shared/api-result';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ValidationPipe } from 'src/shared/validator.pipe';
import { LoginUserDTO, UserDTO, RegisterUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor(private userService: UserService) {}

    @Get('users')
    async getUsers() {
        return (new ApiResult).success(await this.userService.getUsers());
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: LoginUserDTO) {
        return (new ApiResult).success(await this.userService.login(data));
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() data: RegisterUserDTO) {
        return (new ApiResult).success(await this.userService.register(data));
    }
}
