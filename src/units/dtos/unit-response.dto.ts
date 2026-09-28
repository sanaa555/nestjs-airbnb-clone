import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";


export class UnitResponseDto{
    _id:string
    title:string;

    description:string;

    address:string;

    photos:string[];

    costPerDay:number;

    country:string

    city:string

    unitCategory:string

    user:string


    roomsCount:number;


    adultsCount:number;

    kidsCount:number;

     hasInternetService:boolean;

     hasKitchen:boolean;
    
    hasPrivateGarage:boolean;
    
    isActive:boolean;
    
    isDeleted:boolean;

    
} 

