import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { PaymentSchema } from './schemas/payment.schema';
import { PaymentRepository } from './repositories/payment-repository';

@Module({
  imports:[MongooseModule.forFeature([{
    name:ModelNames.PAYMENTS,
    schema:PaymentSchema
  }])],
  controllers: [PaymentsController],
  providers: [PaymentsService,PaymentRepository]
})
export class PaymentsModule {}
