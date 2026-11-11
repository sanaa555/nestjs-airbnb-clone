import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePaymentParamsDto {
  @ApiProperty({
    description: 'Booking MongoDB ID to create a checkout session for.',
    example: '64a1f2e3b4c5d6e7f8a9b0c1',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'bookingId must be a valid MongoDB ID' })
  bookingId: string;
}
