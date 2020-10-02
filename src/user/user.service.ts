import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDTO, UserDTO, UserRO, RegisterUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {}

    async getUsers(): Promise<UserRO[]>{
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    async login(data: LoginUserDTO): Promise<UserRO> {
        const {username, password} = data;
        const user = await this.userRepository.findOne({where: {username}});
        if (!user) {
            throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST)
        }
        if (!(await user.comparePassword(password))) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST)
        }
        return user.toResponseObject(true);
    }
    async register(data: RegisterUserDTO) {
       const {email, password, passwordConfirm} = data;
       let user = await this.userRepository.findOne({where: {email}});
       if (user) {
           throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
       }
       if (password !== passwordConfirm) {
        throw new HttpException('Different passwod and confirm password', HttpStatus.BAD_REQUEST);
       }
       user = await this.userRepository.create(data);
       await this.userRepository.save(user);
       return user.toResponseObject(true);
    }

}
