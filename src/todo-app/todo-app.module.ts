import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoAppController } from './todo-app.controller';
import { TodoEntity } from './todo-app.entity';
import { TodoAppService } from './todo-app.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoAppController],
  providers: [TodoAppService]
})
export class TodoAppModule {}
