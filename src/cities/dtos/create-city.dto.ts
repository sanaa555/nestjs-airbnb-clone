import { IsMongoId, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class CreateCityDto{
    
      @ApiProperty({ description: "City name", example: "Cairo" })
      @IsNotEmpty()
      @IsString()
      name:string
      @ApiProperty({ description: "Country MongoDB ID", example: "507f1f77bcf86cd799439011" })
      @IsNotEmpty()
      @IsMongoId()
      country:string
}