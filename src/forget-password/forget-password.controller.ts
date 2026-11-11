import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { SendForgetPassworOtpDto } from "./dtos/send-forget-password-otp.dto";
import { VerifyForgetPassworOtpDto } from "./dtos/verify-forget-password-otp.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { ForgetPasswordService } from "./forget-password.service";
import { ForgetPasswordThrottlerGuard } from "./guards/forget-password-throttler.guard";
import { Throttle } from "@nestjs/throttler";
import { API_TAGS } from "src/common/swagger/constant";
import { ApiTags } from "node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { SendForgetPasswordOtpSwagger } from "./swagger/sendForgetPasswordOtp.swagger";
import { VerifyForgetPasswordOtpSwagger } from "./swagger/verifyForgetPasswordOtp.swagger";
import { ResetPasswordSwagger } from "./swagger/resetPassword.swagger";

@Controller("forget-password")
@Public()
 @ApiTags(API_TAGS.FORGET_PASSWORD) 
export class ForgetPasswordController {
    constructor(
        private readonly forgetPasswordService: ForgetPasswordService
    ) {}

    @Post("/send")
    @SendForgetPasswordOtpSwagger()
    @UseGuards(ForgetPasswordThrottlerGuard)
    @Throttle({ default: { limit: 3, ttl: 600000 } }) // allow 3 request only with in 10 minutes
    @HttpCode(HttpStatus.NO_CONTENT)
    async sendForgetPasswordOtp(
        @Body() body: SendForgetPassworOtpDto
    ): Promise<void> {
        return this.forgetPasswordService.sendForgetPasswordOtp(body.email);
    }

    @Post("/verify")
    @VerifyForgetPasswordOtpSwagger()
    @HttpCode(HttpStatus.NO_CONTENT)
    async verifyForgetPasswordOtp(
        @Body() body: VerifyForgetPassworOtpDto
    ): Promise<void> {
        return this.forgetPasswordService.verifyForgetPasswordOtp(body);
    }

    @Post("/reset")
    @ResetPasswordSwagger()
    @HttpCode(HttpStatus.NO_CONTENT)
    async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
        return this.forgetPasswordService.resetPassword(body);
    }
}