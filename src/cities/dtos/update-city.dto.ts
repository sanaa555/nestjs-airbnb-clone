import {  IsMongoId, IsOptional, IsString } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"


export class UpdateCityDto{


      @ApiPropertyOptional({ description: "City name", example: "Cairo" })
      @IsOptional()
      @IsString()
      name:string
      @ApiPropertyOptional({ description: "Country MongoDB ID", example: "507f1f77bcf86cd799439011" })
      @IsOptional()
      @IsMongoId()
      country:string
}