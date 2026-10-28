import { Injectable } from "@nestjs/common";
import { OTPRepository } from "../repositories/otp.repository";
import { QueryFilter } from "mongoose";
import { Otp } from "../schemas/otp.schema";
import { OtpResponseDto } from "../dtos/otp-raw-response.dto";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class FindOtpRawUsecase{
    constructor(        private readonly otpRepository:OTPRepository){}

    async excute(query:QueryFilter<Otp>):Promise<OtpResponseDto>{
        const otp = await this.otpRepository.findOne(query)
         if(!otp) throw new BadRequestException('Invalid otp') 
        
        return plainToInstance(OtpResponseDto,otp)
    }
}