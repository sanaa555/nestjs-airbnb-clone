import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Injectable } from "@nestjs/common";
import { Payment } from "../schemas/payment.schema";

@Injectable()
export class PaymentRepository extends BaseRepository<Payment>{
    constructor(
        @InjectModel(ModelNames.PAYMENTS)
        private readonly paymentModel:Model<HydratedDocument<Payment>>
    ){
        super(paymentModel)
    }

}