import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class BookingIdDto{
    @ApiProperty({
        description: 'Booking MongoDB ID',
        example: '64a1f2e3b4c5d6e7f8a9b0c1',
    })
    @IsNotEmpty()
    @IsMongoId({message:' param must be a valid mongo id '})
    id:string
}