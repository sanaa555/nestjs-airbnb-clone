import { BookingStatus } from "../enums/BookingStatus.enum";
import { GuestReview } from "../schemas/subdocument/guest-review.schema";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BookingResponseDto {
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c2' })
    _id: string;
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c1' })
    unit: string;
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c3' })
    guest: string;
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c4' })
    host: string;
    @ApiProperty({ type: String, format: 'date-time', example: '2026-12-10T00:00:00.000Z' })
    checkIn: Date | number;
    @ApiProperty({ type: String, format: 'date-time', example: '2026-12-15T00:00:00.000Z' })
    checkOut: Date | number;
    @ApiProperty({ example: 5 })
    daysCount: number;
    @ApiProperty({ example: 120 })
    pricePerDay: number;
    @ApiProperty({ example: 600 })
    bookingAmount: number;
    @ApiProperty({ example: 60 })
    vatAmount: number;
    @ApiProperty({ example: 660 })
    totalAmount: number; // bookingAmount + vatAmount
    @ApiPropertyOptional({ example: 2 })
    adultsCount?: number;
    @ApiPropertyOptional({ example: 1 })
    kidsCount?: number;
    @ApiPropertyOptional({ example: 'We will arrive around 6 PM.' })
    notes?: string;
    @ApiProperty({ enum: BookingStatus, example: BookingStatus.PENDING })
    status: BookingStatus;
    @ApiPropertyOptional({ example: 'Change of plans' })
    cancellationReason?: string;
    @ApiPropertyOptional({
        type: 'object',
        properties: {
            rating: { type: 'number', example: 5 },
            comment: { type: 'string', example: 'Great stay.' },
        },
        additionalProperties: false,
        example: { rating: 5, comment: 'Great stay.' },
    })
    guestReview?: GuestReview;
}