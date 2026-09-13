import { IsMongoId, IsOptional, IsString } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { PaginationDto } from "src/common/data-access/dto/pagination.dto"


export class FindAllCityDto extends PaginationDto{
      @ApiPropertyOptional({ description: "Filter by city name", example: "Cairo" })
      @IsOptional()
      @IsString()
      name:string
      @ApiPropertyOptional({ description: "Filter by country MongoDB ID", example: "507f1f77bcf86cd799439011" })
      @IsOptional()
      @IsMongoId()
      country:string

   
}