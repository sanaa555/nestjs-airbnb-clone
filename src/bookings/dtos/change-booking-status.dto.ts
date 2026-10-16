import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BookingStatus } from "../enums/BookingStatus.enum";

export class ChangeBookingStatusDto{
    
       @IsNotEmpty()
        @IsEnum(BookingStatus)
        status:BookingStatus

         @IsString()
        @IsOptional()
        cancelationReason?:string
}