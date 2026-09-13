import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CurrencyIdDto{

    @ApiProperty({ description: "Currency MongoDB ID", example: "507f1f77bcf86cd799439011" })
    @IsNotEmpty()
    @IsMongoId({message:'paaram must be a valid mongo id'})
    id:string
}