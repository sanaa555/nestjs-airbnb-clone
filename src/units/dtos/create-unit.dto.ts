import { IsMongoId, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";


export class CreateUnitDto{
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    @IsString()
    title:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    photos:string[];

     @IsNotEmpty()
     @Min(1)
    costPerDay:number;

    @IsNotEmpty()
    @IsMongoId()
    country:string

    @IsNotEmpty()
     @IsMongoId()
    city:string

    @IsNotEmpty()
    @IsMongoId()
    unitCategory:string



    @IsNotEmpty() 
    roomsCount:number;


    @IsNotEmpty()
    adultsCount:number;

   @IsNotEmpty()
    kidsCount:number;

     @IsNotEmpty()
    hasInternetService:boolean;

     @IsNotEmpty()
    hasKitchen:boolean;
    
    @IsNotEmpty()
    hasPrivateGarage:boolean;

    
} 

