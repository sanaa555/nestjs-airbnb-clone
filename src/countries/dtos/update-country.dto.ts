import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateCountryDto{

  @ApiPropertyOptional({ description: "Country name", example: "Egypt" })
     @IsString()
      @IsOptional()  
      name?: string;
    
      @ApiPropertyOptional({ description: "ISO country code", example: "EG" })
        @IsString()
      @IsOptional()  
      countryCode?: string;
}