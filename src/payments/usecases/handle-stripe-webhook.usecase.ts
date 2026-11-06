
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRepository } from '../repositories/payment-repository';
import { PaymentStatus } from '../enums/payment-status.enum';

@Injectable()
export class HandleStripeWebhookUsecase {
    private logger = new Logger(HandleStripeWebhookUsecase.name)
    constructor(
        private readonly paymentRepository: PaymentRepository,
    ) {}

    async execute(event: Stripe.Event): Promise<void> {
        switch (event.type) {

            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                                this.logger.log(
                    `Session ID: ${session.id}, Payment status: ${session.payment_status}`,
                );

                if (session.payment_status === 'paid') {
                    await this.updatePaymentStatus(
                        session,
                        PaymentStatus.PAID,
                    );
                }

                break;
            }

            case 'checkout.session.async_payment_succeeded': {
                const session = event.data.object as Stripe.Checkout.Session;

                await this.updatePaymentStatus(
                    session,
                    PaymentStatus.PAID,
                );

                break;
            }

            case 'checkout.session.async_payment_failed':
            case 'checkout.session.expired': {
                const session = event.data.object as Stripe.Checkout.Session;

                await this.updatePaymentStatus(
                    session,
                    PaymentStatus.FAILED,
                );

                break;
            }
        }
    }

private async updatePaymentStatus(
    session: Stripe.Checkout.Session,
    status: PaymentStatus,
): Promise<void> {
    const paymentId =
        session.metadata?.paymentId || session.client_reference_id;

    if (!paymentId) {
        this.logger.warn(
            `Skipping Stripe session ${session.id}: paymentId is missing`,
        );
        return;
    }

    const result = await this.paymentRepository.updateStatusFromWebhook(
        paymentId,
        status,
        session.payment_intent
            ? session.payment_intent.toString()
            : undefined,
    );

    this.logger.log(
        `Payment update result: matched=${result.matchedCount}, modified=${result.modifiedCount}`,
    );
}
}
