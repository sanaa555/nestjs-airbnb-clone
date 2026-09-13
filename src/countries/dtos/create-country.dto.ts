import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCountryDto {

  @ApiProperty({ description: "Country name", example: "Egypt" })
  @IsString()
  @IsNotEmpty()  
  name: string;


    @ApiPropertyOptional({ description: "ISO country code", example: "EG" })
    @IsString()
  @IsOptional()
  countryCode?: string;
}
