import { IsMongoId, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";


export class UpdateUnitDto{
    @IsOptional()
    @MinLength(5)
    @MaxLength(100)
    @IsString()
    title:string;

    @IsOptional()
    description:string;

    @IsOptional()
    address:string;


     @IsOptional()
     @Min(1)
    costPerDay:number;

    @IsOptional()
    @IsMongoId()
    country:string

    @IsOptional()
     @IsMongoId()
    city:string

    @IsOptional()
    @IsMongoId()
    unitCategory:string



    @IsOptional() 
    roomsCount:number;


    @IsOptional()
    adultsCount:number;

   @IsOptional()
    kidsCount:number;

     @IsOptional()
    hasInternetService:boolean;

     @IsOptional()
    hasKitchen:boolean;
    
    @IsOptional()
    hasPrivateGarage:boolean;

    
} 

