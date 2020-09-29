import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoAppController } from './photo-app.controller';
import { PhotoAppService } from './photo-app.service';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  controllers: [PhotoAppController],
  providers: [PhotoAppService]
})
export class PhotoAppModule {}
