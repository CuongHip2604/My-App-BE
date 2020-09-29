import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    taskName: string;

    @Column('text')
    isActive: string;

    @CreateDateColumn()
    created: Date;
}