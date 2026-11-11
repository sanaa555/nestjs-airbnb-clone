import { IsMongoId, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateUnitDto{
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    @IsString()
    @ApiPropertyOptional({ description: 'Unit title', example: 'Modern 2-Bedroom Apartment' })
    title:string;

    @IsOptional()
    @ApiPropertyOptional({ description: 'Unit description', example: 'A bright apartment near the city center' })
    description:string;

    @IsOptional()
    @ApiPropertyOptional({ description: 'Unit street address', example: '123 Main Street' })
    address:string;


     @IsOptional()
     @Min(1)
    @ApiPropertyOptional({ description: 'Price per day', example: 120 })
    costPerDay:number;

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({ description: 'Country MongoDB ID', example: '64a1f2e3b4c5d6e7f8a9b0c1' })
    country:string

    @IsOptional()
     @IsMongoId()
    @ApiPropertyOptional({ description: 'City MongoDB ID', example: '64a1f2e3b4c5d6e7f8a9b0c2' })
    city:string

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({ description: 'Unit category MongoDB ID', example: '64a1f2e3b4c5d6e7f8a9b0c3' })
    unitCategory:string



    @IsOptional()
    @ApiPropertyOptional({ description: 'Number of rooms', example: 3 })
    roomsCount:number;


    @IsOptional()
    @ApiPropertyOptional({ description: 'Maximum number of adults', example: 2 })
    adultsCount:number;

   @IsOptional()
    @ApiPropertyOptional({ description: 'Maximum number of children', example: 1 })
    kidsCount:number;

     @IsOptional()
     @ApiPropertyOptional({ description: 'Whether the unit has internet service', example: true })
    hasInternetService:boolean;

     @IsOptional()
     @ApiPropertyOptional({ description: 'Whether the unit has a kitchen', example: true })
    hasKitchen:boolean;
    
    @IsOptional()
    @ApiPropertyOptional({ description: 'Whether the unit has a private garage', example: false })
    hasPrivateGarage:boolean;

    
} 

