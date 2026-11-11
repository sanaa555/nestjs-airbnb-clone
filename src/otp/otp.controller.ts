import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { API_TAGS } from 'src/common/swagger/constant';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { SendOtpSwagger } from './swagger/sendOtp.swagger';
import { VerifyOtpSwagger } from './swagger/verifyOtp.swagger';

@Controller('otp')
@Public()
 @ApiTags(API_TAGS.OTP) 
export class OtpController {
    constructor(
        private readonly otpService:OtpService
    ){}

    @Post('/send')
    @SendOtpSwagger()
    @HttpCode(HttpStatus.NO_CONTENT)
    async sendOtp(
        @Body() body:SendOtpDto
    ):Promise<void>{
         return this.otpService.sendOtp(body.email)
    }

    @Post('/verify')
    @VerifyOtpSwagger()
     @HttpCode(HttpStatus.NO_CONTENT)
    async verifyOtp(
        @Body() body:VerifyOtpDto
    ):Promise<void>{
          return this.otpService.verifyOtp(body)
    }
}
