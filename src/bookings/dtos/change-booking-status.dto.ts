import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BookingStatus } from "../enums/BookingStatus.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ChangeBookingStatusDto{
       @ApiProperty({
            description: 'New status for the booking.',
            enum: BookingStatus,
            example: BookingStatus.CONFIRMED,
        })
       @IsNotEmpty()
        @IsEnum(BookingStatus)
        status:BookingStatus

         @ApiPropertyOptional({
            description: 'Optional reason for cancelling the booking. Used when status is CANCELLED.',
            example: 'The property is unavailable.',
        })
         @IsString()
        @IsOptional()
        cancelationReason?:string
}