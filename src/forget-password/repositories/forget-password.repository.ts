import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Injectable } from "@nestjs/common";
import { ForgetPassword } from "../schemas/forget-password.schema";

@Injectable()
export class ForgetPasswordRepository extends BaseRepository<ForgetPassword>{
    constructor(
        @InjectModel(ModelNames.FORGET_PASSWORD)
        private readonly forgetPasswordModel:Model<HydratedDocument<ForgetPassword>>
    ){
        super(forgetPasswordModel)
    }

}