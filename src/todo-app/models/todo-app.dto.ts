import { ApiProperty } from "@nestjs/swagger";

export class TodoDTO {
    @ApiProperty()
    taskName: string;
    
    @ApiProperty()
    isActive: string;
}