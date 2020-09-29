import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { PhotoDTO } from './model/photo-app.dto';
import { PhotoEntity } from './photo.entity';

@Injectable()
export class PhotoAppService {
    constructor(@InjectRepository(PhotoEntity) private photoRepository: Repository<PhotoEntity>) {}

    getPhotos() {
        return this.photoRepository.find()
    }

    async addNew(data: PhotoDTO) {
        const photo = await this.photoRepository.create(data)
        await this.photoRepository.save(photo)
        return photo;
    }

    async getPhotoById(id: number) {
        return await this.photoRepository.findOne({where: {id}});
    }

    async updatePhoto(id: number, data: PhotoDTO) {
        await this.photoRepository.update({id}, data);
        return await this.photoRepository.findOne({id});
    }

    async deletePhoto(id: number) {
        await this.photoRepository.delete({id});
        return {deleted: true};
    }
}
