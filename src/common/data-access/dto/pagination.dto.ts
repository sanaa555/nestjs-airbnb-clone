import { IsOptional } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"


export class PaginationDto{

     @ApiPropertyOptional({ description: 'Page number', example: 1, type: Number })
     @IsOptional()
          page?:number
    
        @ApiPropertyOptional({ description: 'Number of records per page', example: 20, type: Number })
        @IsOptional()
         limit?:number
    
        @ApiPropertyOptional({ description: 'Ignore pagination limits', example: false, type: Boolean })
        @IsOptional()
         ignoreLimit?:boolean
}