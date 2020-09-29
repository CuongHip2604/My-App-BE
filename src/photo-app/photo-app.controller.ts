import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PhotoDTO } from './model/photo-app.dto';
import { PhotoAppService } from './photo-app.service';

@Controller('photo-app')
export class PhotoAppController {

    constructor(private photoService: PhotoAppService) {}

    @Get()
    @ApiTags('photo-app')
    getPhotos() {
        return this.photoService.getPhotos();
    }

    @Post('add-new')
    @ApiTags('photo-app')
    addNew(@Body() data: PhotoDTO) {
        return this.photoService.addNew(data);
    }

    @Get(':id')
    @ApiTags('photo-app')
    getPhotoById(@Param('id') id: number) {
        return this.photoService.getPhotoById(id);
    }

    @Put('update/:id')
    @ApiTags('photo-app')
    updatePhoto(@Param('id') id: number, @Body() data: PhotoDTO) {
        return this.photoService.updatePhoto(id, data)
    }

    @Delete('delete/:id')
    @ApiTags('photo-app')
    deletePhoto(@Param('id') id: number) {
        return this.photoService.deletePhoto(id)
    }
}
