import { Injectable } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repositories/forget-password.repository";
import { VerifyForgetPassworOtpDto } from "../dtos/verify-forget-password-otp.dto";


@Injectable()
export class VerifyForgetPasswordOtpUsecase{
    constructor(
        private readonly forgetPasswordRepository:ForgetPasswordRepository
    ){}

    async excute( dto :VerifyForgetPassworOtpDto):Promise<void>{

    }
}