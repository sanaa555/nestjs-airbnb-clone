import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUnitCategoryDto{
    @ApiProperty({ description: "Unit category name", example: "Entire place" })
   @IsString()
   @IsNotEmpty()
    name:string;
    @ApiPropertyOptional({ description: "Category icon", example: "home" })
    @IsString()
    @IsOptional()
    icon?:string
}