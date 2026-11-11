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
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { API_TAGS } from 'src/common/swagger/constant';
import { CreatePaymentParamsDto } from './dtos/create-payment-params.dto';
import { CreatePaymentSwagger } from './swagger/createPayment.swagger';
import { HandleWebhookSwagger } from './swagger/handleWebhook.swagger';
import { PaymentSuccessSwagger } from './swagger/paymentSuccess.swagger';

@Controller('payments')
 @ApiTags(API_TAGS.PAYMENTS) 
export class PaymentsController {
     private logger= new Logger(PaymentsController.name)

    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly stripeService: StripeService,
    ) {}

    @Public()
    @Post('/webhook')
    @HandleWebhookSwagger()
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
    @PaymentSuccessSwagger()
    success(@Query('session_id') sessionId: string) {
        return {
            message: 'Payment completed successfully',
            sessionId,
        };
    }
    

    @Post('/:bookingId')
    @CreatePaymentSwagger()
    async createPayment(
        @Param() params: CreatePaymentParamsDto,
        @CurrentAccount() principale: Principale,
    ): Promise<PaymentResponseDto> {
        return this.paymentsService.createPayment(params.bookingId, principale);
    }
}
