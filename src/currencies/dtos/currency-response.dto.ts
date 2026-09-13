

import { ApiProperty } from "@nestjs/swagger";

export class CurrencyResponseDto{

    @ApiProperty({ example: "507f1f77bcf86cd799439011" })
    _id:string

    @ApiProperty({ example: "Egyptian Pound" })
    name:string

    @ApiProperty({ example: "EGP" })
    currencyCode:string
}