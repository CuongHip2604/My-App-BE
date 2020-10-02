import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from "./user.dto";
import _ from 'lodash';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text')
    username: string;

    @Column('text')
    password: string;


    @Column('text')
    email?: string;

    @CreateDateColumn()
    created: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean): UserRO {
        const {id, created, username, email, token} = this;
        const responseObject: any = {id, created, username, email}
        if(showToken) {
            responseObject.token = token
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign({
            id,
            username
        }, process.env.SECRET, {expiresIn: '1d'})
    }
}