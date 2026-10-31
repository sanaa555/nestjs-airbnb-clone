import { Injectable } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repositories/forget-password.repository";
import { VerifyForgetPassworOtpDto } from "../dtos/verify-forget-password-otp.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class VerifyForgetPasswordOtpUsecase{
    constructor(
        private readonly forgetPasswordRepository:ForgetPasswordRepository
    ){}

    async excute( body :VerifyForgetPassworOtpDto):Promise<void>{

        // find forget password document by email
           
        const forgetPassword= await this.forgetPasswordRepository.findOne({email:body.email})

        if(!forgetPassword) throw new BadRequestException('Invalid email')

        if(body.code !== forgetPassword.code) throw new BadRequestException('Invalid code')
            if(new Date() > forgetPassword.expiresAt) throw new BadRequestException(' code expired')
                if(forgetPassword.isVerified) throw new BadRequestException(' otp already verified')

                await this.forgetPasswordRepository.findOneAndUpdate({email:body.email},{
                    isVerified:true
                })

    }
}