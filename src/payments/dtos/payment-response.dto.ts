import { PaymentStatus } from "../enums/payment-status.enum";

export class PaymentResponseDto {
    _id: string;
    booking: string;
    guest: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    checkoutUrl: string;
    providerPaymentId?: string;
    paidAt?: Date;
    refundedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}