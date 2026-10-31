import { Injectable } from '@nestjs/common';
import { VerifyForgetPassworOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SendForgetPasswordOtpUsecase } from './usecases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUsecase } from './usecases/verify-forget-password-otp.usecase';
import { ResetPasswordUsecase } from './usecases/reset-password.usecase';

@Injectable()
export class ForgetPasswordService {
    constructor(
        private readonly sendForgetPasswordOtpUsecase:SendForgetPasswordOtpUsecase,
        private readonly verifyForgetPasswordOtpUsecase:VerifyForgetPasswordOtpUsecase,
        private readonly resetPasswordUsecase:ResetPasswordUsecase
    ){}

    async sendForgetPasswordOtp(email :string):Promise<void>{
                return this.sendForgetPasswordOtpUsecase.excute(email)
        }

        async verifyForgetPasswordOtp(dto :VerifyForgetPassworOtpDto):Promise<void>{
                 return this.verifyForgetPasswordOtpUsecase.excute(dto)
        
            }

            async resetPassword(body :ResetPasswordDto):Promise<void>{
                    return this.resetPasswordUsecase.excute(body)
            
                }
}
