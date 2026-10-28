import { Injectable } from "@nestjs/common";
import { VerifyOtpDto } from "../dtos/verify-otp.dto";
import { OTPRepository } from "../repositories/otp.repository";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { FindOtpRawUsecase } from "./find-otp-raw.usecase";

@Injectable()
export class VerifyOtpUsecase{

constructor(
        private readonly findOtpRawUsecase:FindOtpRawUsecase,
        private readonly otpRepository:OTPRepository
    ){}

    async excute(body:VerifyOtpDto):Promise<void>{

        //1-find otp by email 
          const otp = await this.findOtpRawUsecase.excute({email:body.email})
          //3-check if otp is correct
          if(body.code !==otp.code) throw new BadRequestException('Invalid code')

        //3-check if otp is expired
        if( new Date()> otp.expiresAt) throw new BadRequestException(' Otp expired' )
        //4- check if otp is verified
        if(otp.isVerified===true) throw new BadRequestException(' Otp already verified' )

        //5- update otp isVerified to true
     await this.otpRepository.findOneAndUpdate({email:body.email},
         {isVerified:true})

    }
}