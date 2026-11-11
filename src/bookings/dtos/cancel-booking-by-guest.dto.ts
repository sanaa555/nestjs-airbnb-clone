import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CancelBookingByGuestDto{
    @ApiPropertyOptional({
        description: 'Optional reason for cancelling the booking.',
        example: 'Change of plans',
    })
    @IsString()
    @IsOptional()
    cancelationReason?:string

}