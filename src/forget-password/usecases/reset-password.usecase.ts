import { Injectable } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repositories/forget-password.repository";
import { VerifyForgetPassworOtpDto } from "../dtos/verify-forget-password-otp.dto";
import { ResetPasswordDto } from "../dtos/reset-password.dto";


@Injectable()
export class ResetPasswordUsecase{
    constructor(
        private readonly forgetPasswordRepository:ForgetPasswordRepository
    ){}

    async excute( dto :ResetPasswordDto):Promise<void>{

    }
}