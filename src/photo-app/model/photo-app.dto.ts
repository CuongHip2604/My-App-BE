import { ApiProperty } from "@nestjs/swagger";

export class PhotoDTO {
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    image_url: string;
    
    @ApiProperty()
    categoty: string;
}