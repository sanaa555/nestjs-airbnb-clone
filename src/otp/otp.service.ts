import { Injectable } from '@nestjs/common';
import { SendOtpUsecase } from './usecases/send-otp.usecase';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { VerifyOtpUsecase } from './usecases/verify-otp.usecase';

@Injectable()
export class OtpService {
    constructor(
        private readonly sendOtpUsecase:SendOtpUsecase,
        private readonly verifyOtpUsecase:VerifyOtpUsecase,

    ){}


    async sendOtp(email:string):Promise<void>{
        return this.sendOtpUsecase.excute(email)

    }
    async verifyOtp(body:VerifyOtpDto):Promise<void>{
        return this.verifyOtpUsecase.excute(body)

    }
}
