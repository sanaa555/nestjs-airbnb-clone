import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendForgetPassworOtpDto } from './dtos/send-forget-password-otp.dto';
import { VerifyForgetPassworOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ForgetPasswordService } from './forget-password.service';

@Controller('forget-password')
@Public()
export class ForgetPasswordController {
   
    constructor(
        private readonly forgetPasswordService:ForgetPasswordService
    ){}

    @Post('/send')
    @HttpCode(HttpStatus.NO_CONTENT)
    async sendForgetPasswordOtp(@Body() dto :SendForgetPassworOtpDto):Promise<void>{
            return this.forgetPasswordService.sendForgetPasswordOtp(dto)
    }

    @Post('/verify')
    @HttpCode(HttpStatus.NO_CONTENT)
    async verifyForgetPasswordOtp(@Body() dto :VerifyForgetPassworOtpDto):Promise<void>{
         return this.forgetPasswordService.verifyForgetPasswordOtp(dto)

    }

    @Post('/reset')
    @HttpCode(HttpStatus.NO_CONTENT)
    async resetPassword(@Body() dto :ResetPasswordDto):Promise<void>{
        return this.forgetPasswordService.resetPassword(dto)

    }



}
