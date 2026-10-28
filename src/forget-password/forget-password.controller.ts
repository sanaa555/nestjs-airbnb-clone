import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendForgetPassworOtpDto } from './dtos/send-forget-password-otp.dto';
import { VerifyForgetPassworOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ForgetPasswordService } from './forget-password.service';
import { ForgetPasswordThrottlerGuard } from './guards/forget-password-throttler.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('forget-password')
@Public()
export class ForgetPasswordController {
   
    constructor(
        private readonly forgetPasswordService:ForgetPasswordService
    ){}

    @Post('/send')
    @UseGuards(ForgetPasswordThrottlerGuard)
    @Throttle({ default: { limit: 3, ttl: 600000 } }) // allow 3 request only with in 10 minutes
    @HttpCode(HttpStatus.NO_CONTENT)
    async sendForgetPasswordOtp(@Body() body :SendForgetPassworOtpDto):Promise<void>{
            return this.forgetPasswordService.sendForgetPasswordOtp(body.email)
    }

    @Post('/verify')
    @HttpCode(HttpStatus.NO_CONTENT)
    async verifyForgetPasswordOtp(@Body() body :VerifyForgetPassworOtpDto):Promise<void>{
         return this.forgetPasswordService.verifyForgetPasswordOtp(body)

    }

    @Post('/reset')
    @HttpCode(HttpStatus.NO_CONTENT)
    async resetPassword(@Body() dto :ResetPasswordDto):Promise<void>{
        return this.forgetPasswordService.resetPassword(dto)

    }



}
