import { PaymentsService } from './payments.service';
import { CurrentAccount, Principale } from 'src/auth/decorators/current-account.decorator';
import { PaymentResponseDto } from './dtos/payment-response.dto';
import { Param, Controller, Headers, HttpCode, HttpStatus, Post, Req, Logger,} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import Stripe from 'stripe';
import { StripeService } from './services/stripe.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { Get, Query } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
     private logger= new Logger(PaymentsController.name)

    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly stripeService: StripeService,
    ) {}

    @Public()
    @Post('/webhook')
    @HttpCode(HttpStatus.OK)
    async handleWebhook(
        @Req() request: RawBodyRequest<Request>,
        @Headers('stripe-signature') signature: string,
    ) {
        if (!request.rawBody || !signature) {
            throw new BadRequestException('Invalid Stripe webhook request');
        }
        const event = this.stripeService.constructWebhookEvent(
            request.rawBody,
            signature,
        );

        this.logger.log(`Stripe event received: ${event.type}`);

        await this.paymentsService.handleStripeEvent(event);

        return { received: true };
    }

    @Public()
    @Get('/success')
    success(@Query('session_id') sessionId: string) {
        return {
            message: 'Payment completed successfully',
            sessionId,
        };
    }
    

    @Post('/:bookingId')
    async createPayment(
        @Param('bookingId') bookingId: string,
        @CurrentAccount() principale: Principale,
    ): Promise<PaymentResponseDto> {
        return this.paymentsService.createPayment(bookingId, principale);
    }
}

