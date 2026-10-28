import { Injectable } from "@nestjs/common";
import { SendForgetPassworOtpDto } from "../dtos/send-forget-password-otp.dto";
import { ForgetPasswordRepository } from "../repositories/forget-password.repository";


@Injectable()
export class SendForgetPasswordOtpUsecase{
    constructor(
        private readonly forgetPasswordRepository:ForgetPasswordRepository
    ){}

    async excute( dto :SendForgetPassworOtpDto):Promise<void>{

    }
}