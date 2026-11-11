import { ArrayNotEmpty, IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteUnitPhotosDto{
     
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    @ApiProperty({
        description: 'Photo URLs to remove from the unit',
        type: [String],
        example: ['https://example.com/unit-photo.jpg'],
    })
    photos:string[]
}