import { ApiProperty } from "@nestjs/swagger";

export class AvailabilityResponseDto{

    @ApiProperty({ description: 'Whether the unit is available for the selected dates', example: true })
    available:Boolean;

    @ApiProperty({ description: 'Number of nights in the requested stay', example: 5 })
    daysCount:number;

    @ApiProperty({ description: 'Unit price per night', example: 120 })
    pricePerDay:number;

    @ApiProperty({ description: 'Subtotal before VAT', example: 600 })
    bookingAmount:number; // price per day * daysCount

    @ApiProperty({ description: 'VAT rate as a percentage', example: 10 })
    vat:number;

    @ApiProperty({ description: 'VAT amount for the stay', example: 60 })
    vatAmount:number;   //bookingAmount  *   Vate rate

    @ApiProperty({ description: 'Total amount including VAT', example: 660 })
    totalAmount:number; // vateAmount + bookingAmount

}