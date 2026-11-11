import {  IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateBookingRequestDto{
 
    
        @ApiPropertyOptional({
            description: 'Updated check-in date. Provide this together with checkOut as an ISO 8601 date-time or timestamp.',
            oneOf: [
                { type: 'string', format: 'date-time' },
                { type: 'number' },
            ],
            example: '2026-12-10T00:00:00.000Z',
        })
        @IsOptional()
        checkIn?:number|Date
    
        
        @ApiPropertyOptional({
            description: 'Updated check-out date. Provide this together with checkIn as an ISO 8601 date-time or timestamp.',
            oneOf: [
                { type: 'string', format: 'date-time' },
                { type: 'number' },
            ],
            example: '2026-12-15T00:00:00.000Z',
        })
        @IsOptional()
        checkOut?:number|Date
    
        
        @ApiPropertyOptional({
            description: 'Updated number of adults; must not exceed the unit capacity.',
            type: Number,
            example: 2,
        })
        @IsOptional()
        adultsCount?:number
    
        
        @ApiPropertyOptional({
            description: 'Updated number of children; must not exceed the unit capacity.',
            type: Number,
            example: 1,
        })
        @IsOptional()
        kidsCount?:number
        
        @ApiPropertyOptional({
            description: 'Optional note for the host.',
            example: 'We will arrive around 6 PM.',
        })
        @IsString()
       @IsOptional()
        notes?:string
    
}