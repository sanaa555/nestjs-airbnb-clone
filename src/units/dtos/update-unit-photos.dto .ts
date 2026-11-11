
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUnitPhotosDto{
     
    @ApiProperty({
        description: 'Photo files to upload (JPG or PNG, up to 2 MB each; maximum 5 files)',
        type: 'string',
        format: 'binary',
        isArray: true,
    })
    photos:string[]
}