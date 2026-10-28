import { Injectable } from "@nestjs/common";
import { OTPRepository } from "../repositories/otp.repository";
import { QueryFilter } from "mongoose";
import { Otp } from "../schemas/otp.schema";
import { OtpResponseDto } from "../dtos/otp-raw-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOtpRawUsecase{
    constructor(        private readonly otpRepository:OTPRepository){}

    async excute(query:QueryFilter<Otp>):Promise<OtpResponseDto>{
        const otp = await this.otpRepository.findOne(query)
        
        return plainToInstance(OtpResponseDto,otp)
    }
}