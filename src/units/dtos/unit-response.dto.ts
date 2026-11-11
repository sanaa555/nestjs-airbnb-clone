import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";


export class UnitResponseDto{
    @ApiProperty({description:'unit id',example:'64a1f3e2b4c5d6e7f8g9h0i1'})
    _id:string
    @ApiProperty({description:'unit title',example:'Beautiful apartment in the city center'})
    title:string;
@ApiProperty({description:'unit description',example:'This is a beautiful apartment located in the heart of the city, with stunning views and modern amenities.'})
    description:string;
@ApiProperty({description:'unit address',example:'123 Main St, Cityville, Country'})
    address:string;
@ApiProperty({description:'unit photos',example:['https://example.com/photo1.jpg','https://example.com/photo2.jpg']})
    photos:string[];
@ApiProperty({description:'unit cost per day',example:100})
    costPerDay:number;
@ApiProperty({description:'unit country',example:'USA'})
    country:string
@ApiProperty({description:'unit city',example:'New York'})
    city:string
@ApiProperty({description:'unit category',example:'Apartment'})
    unitCategory:string
@ApiProperty({description:'unit user',example:'64a1f3e2b4c5d6e7f8g9h0i1'})
    user:string
@ApiProperty({description:'unit rooms count',example:3})

    roomsCount:number;

@ApiProperty({description:'unit adults count',example:2})   
    adultsCount:number;
@ApiProperty({description:'unit kids count',example:1})
    kidsCount:number;
@ApiProperty({description:'unit has internet service',example:true})
     hasInternetService:boolean;
@ApiProperty({description:'unit has kitchen',example:true})
     hasKitchen:boolean;
   @ApiProperty({description:'unit has Private Garage',example:true}) 
    hasPrivateGarage:boolean;
    @ApiProperty({description:'unit is active',example:true})
    isActive:boolean;
    @ApiProperty({description:'unit is deleted',example:false})
    isDeleted:boolean;

    
} 

