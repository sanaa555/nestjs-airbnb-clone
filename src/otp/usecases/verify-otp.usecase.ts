import { Injectable } from "@nestjs/common";
import { VerifyOtpDto } from "../dtos/verify-otp.dto";
import { OTPRepository } from "../repositories/otp.repository";

@Injectable()
export class VerifyOtpUsecase{

constructor(
        private readonly otpRepository:OTPRepository
    ){}

    async excute(body:VerifyOtpDto):Promise<void>{

    }
}