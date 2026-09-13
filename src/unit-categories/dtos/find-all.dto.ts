import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";

export class FindAllUnitCategories extends PaginationDto{

    
        @ApiPropertyOptional({ description: "Filter by unit category name", example: "Entire place" })
        @IsOptional()
        @IsString()
        name:string;

        @ApiPropertyOptional({ description: "Filter by category icon", example: "home" })
        @IsOptional()
        @IsString()
       currencyCode:string
}