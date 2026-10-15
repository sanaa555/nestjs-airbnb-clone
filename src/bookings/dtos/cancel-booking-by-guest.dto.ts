import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CancelBookingByGuestDto{
    @IsString()
    @IsOptional()
    cancelationReason?:string

}