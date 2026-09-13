import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";


export class FindAllDto extends PaginationDto{


    @ApiPropertyOptional({ description: "Filter by country name", example: "Egypt" })
    @IsOptional()
    @IsString()
    name:string;

    @ApiPropertyOptional({ description: "Filter by ISO country code", example: "EG" })
    @IsOptional()
    @IsString()
    countryCode:string;
 
   
}