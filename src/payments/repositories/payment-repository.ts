import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Injectable } from "@nestjs/common";
import { Payment } from "../schemas/payment.schema";
import { PaymentStatus } from "../enums/payment-status.enum";

@Injectable()
export class PaymentRepository extends BaseRepository<Payment>{
    constructor(
        @InjectModel(ModelNames.PAYMENTS)
        private readonly paymentModel:Model<HydratedDocument<Payment>>
    ){
        super(paymentModel)
    }

async updateStatusFromWebhook(
    paymentId: string,
    status: PaymentStatus,
    paymentIntentId?: string,
) {
    return this.paymentModel.updateOne(
        {
            _id: paymentId,
            status: PaymentStatus.PENDING,
        },
        {
            $set: {
                status,
                ...(status === PaymentStatus.PAID
                    ? {
                        paidAt: new Date(),
                        stripePaymentIntentId: paymentIntentId,
                    }
                    : {}),
            },
        },
    );
}

}