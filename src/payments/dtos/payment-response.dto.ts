import { PaymentStatus } from "../enums/payment-status.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaymentResponseDto {
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c2' })
    _id: string;
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c1' })
    booking: string;
    @ApiProperty({ example: '64a1f2e3b4c5d6e7f8a9b0c3' })
    guest: string;
    @ApiProperty({ type: Number, example: 660 })
    amount: number;
    @ApiProperty({ example: 'EGP' })
    currency: string;
    @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING })
    status: PaymentStatus;
    @ApiProperty({
        description: 'Stripe Checkout URL for completing the payment.',
        type: String,
        format: 'uri',
        example: 'https://checkout.stripe.com/c/pay/cs_test_example',
    })
    checkoutUrl: string;
    @ApiPropertyOptional({ example: 'pi_123456789' })
    providerPaymentId?: string;
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    paidAt?: Date;
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    refundedAt?: Date;
    @ApiProperty({ type: String, format: 'date-time' })
    createdAt: Date;
    @ApiProperty({ type: String, format: 'date-time' })
    updatedAt: Date;
}