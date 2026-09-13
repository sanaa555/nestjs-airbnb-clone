import { IsMongoId, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class CityResponseDto{
       

      @ApiProperty({ example: "507f1f77bcf86cd799439011" })
      _id:string
      @ApiProperty({ example: "Cairo" })
      name:string
    
    
      @ApiProperty({ description: "Country MongoDB ID", example: "507f1f77bcf86cd799439011" })
      country:string
}