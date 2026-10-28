import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Injectable } from "@nestjs/common";
import { Otp } from "../schemas/otp.schema";

@Injectable()
export class OTPRepository extends BaseRepository<Otp>{
    constructor(
        @InjectModel(ModelNames.OTP)
        private readonly OTPModel:Model<HydratedDocument<Otp>>
    ){
        super(OTPModel)
    }

}