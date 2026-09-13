import { Optional } from "@nestjs/common"
import { IsOptional, Max, Min } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"


export class UpsertAppSettingDto{
    
    @ApiPropertyOptional({ description: "VAT rate percentage", example: 14, minimum: 0, maximum: 25 })
    @Optional()
    @Min(0)
    @Max(25)
    vatRate:number
    @ApiPropertyOptional({ description: "Minimum listing price", example: 100, minimum: 0 })
    @IsOptional() 
    @Min(0)
    minPrice:number
}