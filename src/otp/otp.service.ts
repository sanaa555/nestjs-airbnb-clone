import { Injectable } from '@nestjs/common';
import { SendOtpUsecase } from './usecases/send-otp.usecase';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { VerifyOtpUsecase } from './usecases/verify-otp.usecase';
import { FindOtpRawUsecase } from './usecases/find-otp-raw.usecase';
import { OtpResponseDto } from './dtos/otp-raw-response.dto';
import { Otp } from './schemas/otp.schema';
import { QueryFilter } from 'mongoose';

@Injectable()
export class OtpService {
    constructor(
        private readonly sendOtpUsecase:SendOtpUsecase,
        private readonly verifyOtpUsecase:VerifyOtpUsecase,
        private readonly findOtpRawUsecase:FindOtpRawUsecase

    ){}


    async sendOtp(email:string):Promise<void>{
        return this.sendOtpUsecase.excute(email)

    }
    async verifyOtp(body:VerifyOtpDto):Promise<void>{
        return this.verifyOtpUsecase.excute(body)

    }

    async findRawOtp(query:QueryFilter<Otp>):Promise<OtpResponseDto>{
        return this.findOtpRawUsecase.excute(query)

    }
}
