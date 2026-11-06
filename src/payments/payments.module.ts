import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { PaymentSchema } from './schemas/payment.schema';
import { PaymentRepository } from './repositories/payment-repository';
import { BookingsModule } from 'src/bookings/bookings.module';
import { CreatePaymentUsecase } from './usecases/create-payment.usecase';
import { StripeService } from './services/stripe.service';
import { HandleStripeWebhookUsecase } from './usecases/handle-stripe-webhook.usecase';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.PAYMENTS,
    schema:PaymentSchema
  }]),BookingsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService,PaymentRepository,CreatePaymentUsecase,StripeService,HandleStripeWebhookUsecase]
})
export class PaymentsModule {}
