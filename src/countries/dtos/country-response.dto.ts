
import { ApiProperty } from "@nestjs/swagger";

export class CountryResponseDto{

    @ApiProperty({ example: "507f1f77bcf86cd799439011" })
    _id:string;

    @ApiProperty({ example: "Egypt" })
    name:string;

    @ApiProperty({ example: "EG" })
    countryCode:string;

}