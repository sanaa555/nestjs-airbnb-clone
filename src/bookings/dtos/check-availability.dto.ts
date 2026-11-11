import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CheckAvailabilityDto{
    @IsMongoId()
    @ApiProperty({
        description: 'Unit MongoDB ID',
        example: '64a1f2e3b4c5d6e7f8a9b0c1',
    })
    unit:string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Check-in date and time in ISO 8601 format',
        type: String,
        format: 'date-time',
        example: '2026-12-10T00:00:00.000Z',
    })
    checkIn:number|Date

    
    @IsNotEmpty()
    @ApiProperty({
        description: 'Check-out date and time in ISO 8601 format',
        type: String,
        format: 'date-time',
        example: '2026-12-15T00:00:00.000Z',
    })
    checkOut:number|Date

    
    @IsOptional()
    @ApiPropertyOptional({ description: 'Number of adults', type: Number, example: 2 })
    adultsCount?:number

    
    @IsOptional()
    @ApiPropertyOptional({ description: 'Number of children', type: Number, example: 1 })
    kidsCount?:number

}