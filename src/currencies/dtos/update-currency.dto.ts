import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateCurrencyDto{

    @ApiPropertyOptional({ description: "Currency name", example: "Egyptian Pound" })
    @IsString()
    @IsOptional()
    name?:string

    @ApiPropertyOptional({ description: "Currency code", example: "EGP" })
    @IsString()
    @IsOptional()
    currencyCode?:string
}