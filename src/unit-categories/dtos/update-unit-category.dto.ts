import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateUnitCategoryDto{

    @ApiPropertyOptional({ description: "Unit category name", example: "Entire place" })
    @IsString()
    @IsOptional()
    name?:string

    @ApiPropertyOptional({ description: "Category icon", example: "home" })
    @IsString()
    @IsOptional()
    icon?:string
}