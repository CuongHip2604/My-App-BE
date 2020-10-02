import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PhotoDTO {
    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsString()
    image_url: string;
    
    @ApiProperty()
    @IsString()
    category: string;
}