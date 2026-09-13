

import { ApiProperty } from "@nestjs/swagger";

export class UnitCategoryResponseDto{

    @ApiProperty({ example: "507f1f77bcf86cd799439011" })
    _id:string

    @ApiProperty({ example: "Entire place" })
    name:string

    @ApiProperty({ example: "home" })
    icon:string
}