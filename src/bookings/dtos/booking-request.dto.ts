import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class BookingRequestDto{
    @IsMongoId()
        unit:string;
    
        @IsNotEmpty()
        checkIn:number|Date
    
        
        @IsNotEmpty()
        checkOut:number|Date
    
        
        @IsOptional()
        adultsCount?:number
    
        
        @IsOptional()
        kidsCount?:number
        
        @IsString()
       @IsOptional()
        notes?:string
    
}