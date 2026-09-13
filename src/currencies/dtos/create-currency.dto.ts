import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCurrencyDto{
    @ApiProperty({ description: "Currency name", example: "Egyptian Pound" })
   @IsString()
   @IsNotEmpty()
    name:string;
    @ApiPropertyOptional({ description: "Currency code", example: "EGP" })
    @IsString()
    @IsOptional()
    currencyCode?:string
}