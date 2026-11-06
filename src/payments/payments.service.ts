import { Injectable } from '@nestjs/common';
import { CreatePaymentUsecase } from './usecases/create-payment.usecase';
import { PaymentResponseDto } from './dtos/payment-response.dto';
import { Principale } from 'src/auth/decorators/current-account.decorator';
import { HandleStripeWebhookUsecase } from './usecases/handle-stripe-webhook.usecase';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {

    constructor(
        private readonly createPaymentUsecase:CreatePaymentUsecase,
            private readonly handleStripeWebhookUsecase: HandleStripeWebhookUsecase,

    ){}

       async createPayment(
        bookingId: string,
        principale: Principale,
    ) :Promise<PaymentResponseDto>{
        return this.createPaymentUsecase.excute(bookingId, principale);
    }
    async handleStripeEvent(event: Stripe.Event): Promise<void> {
    return this.handleStripeWebhookUsecase.execute(event);
}
}
