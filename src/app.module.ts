import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoAppModule } from './photo-app/photo-app.module';
import { TodoAppModule } from './todo-app/todo-app.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PhotoAppModule, TodoAppModule, UserModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
