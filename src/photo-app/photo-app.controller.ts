import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/shared/api-result';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ValidationPipe } from 'src/shared/validator.pipe';
import { PhotoDTO } from './model/photo-app.dto';
import { PhotoAppService } from './photo-app.service';

@Controller('photo-app')
@ApiTags('photo-app')
export class PhotoAppController {

    constructor(private photoService: PhotoAppService) {}

    @Get()
    @UseGuards(new AuthGuard())
    @ApiBearerAuth()
    async getPhotos() {
        return (new ApiResult).success(await this.photoService.getPhotos());
    }

    @Post('add-new')
    @UsePipes(new ValidationPipe())
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async addNew(@Body() data: PhotoDTO) {
        return (new ApiResult).success(await this.photoService.addNew(data));
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async getPhotoById(@Param('id') id: number) {
        return (new ApiResult).success(await this.photoService.getPhotoById(id));
    }

    @Put('update/:id')
    @UsePipes(new ValidationPipe())
    @ApiBearerAuth()
    @UseGuards(new AuthGuard())
    async updatePhoto(@Param('id') id: number, @Body() data: PhotoDTO) {
        return (new ApiResult).success(await this.photoService.updatePhoto(id, data))
    }

    @Delete('delete/:id')
    @ApiBearerAuth()
    async deletePhoto(@Param('id') id: number) {
        return (new ApiResult).success(await this.photoService.deletePhoto(id))
    }
}
