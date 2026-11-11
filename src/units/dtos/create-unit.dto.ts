import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";


export class CreateUnitDto{
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    @IsString()
   @ApiProperty({
  description: 'unit title',
  example: 'Modern 2-Bedroom Apartment in New Cairo'
})
    title:string;

    @IsNotEmpty()
    @ApiProperty({
            description:"unit description",
            example:'Beautiful apartment in the heart of the city'
        })
    description:string;

    @IsNotEmpty()
    @ApiProperty({
            description:"unit address",
            example:'123 Main Street'
        })
    address:string;

    @IsOptional()
    @ApiProperty({
            description:"unit photos",
            example:['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg']
        })
    photos?:string[];
@ApiProperty({
            description:"unit cost per day",
            example:100
        })
     @IsNotEmpty()
       @Type(() => Number)
     @IsNumber()
     @Min(1)
    costPerDay:number;

@ApiProperty({
            description:"unit country id",
            example:'64a1f2e3b4c5d6e7f8g9h0i1'
        })
    @IsNotEmpty()
    @IsMongoId()
    country:string
   @ApiProperty({
            description:"unit city id",
            example:'64a1f2e3b4c5d6e7f8g9h0i2'
        })
    @IsNotEmpty()
     @IsMongoId()
    city:string
   @ApiProperty({
            description:"unit category id",
            example:'64a1f2e3b4c5d6e7f8g9h0i3'
        })
    @IsNotEmpty()
    @IsMongoId()
    unitCategory:string


@ApiProperty({
            description:"unit rooms count",
            example:3
        })
    @IsNotEmpty() 
    roomsCount:number;

@ApiProperty({
            description:"unit adults Count count",
            example:2
        })
    @IsNotEmpty()
    adultsCount:number;

    @ApiProperty({
      description:"unit kids Count count",
      example:2
    })

   @IsNotEmpty()
    kidsCount:number;
    @ApiProperty({
            description:"unit has internet service",
            example:true
        })

     @IsNotEmpty()
    hasInternetService:boolean;
     
    @ApiProperty({
            description:"unit has kitchen",
            example:true
        })
     @IsNotEmpty()
    hasKitchen:boolean;
    @ApiProperty({
            description:"unit has Private Garage",
            example:true
        })
    @IsNotEmpty()
    hasPrivateGarage:boolean;

    
} 

