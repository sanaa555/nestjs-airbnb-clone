import {  IsOptional, IsString } from "class-validator";


export class UpdateBookingRequestDto{
 
    
        @IsOptional()
        checkIn?:number|Date
    
        
        @IsOptional()
        checkOut?:number|Date
    
        
        @IsOptional()
        adultsCount?:number
    
        
        @IsOptional()
        kidsCount?:number
        
        @IsString()
       @IsOptional()
        notes?:string
    
}