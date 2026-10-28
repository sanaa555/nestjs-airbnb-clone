import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import {  ForgetPasswordSchema } from './schemas/forget-password.schema';
import { ForgetPasswordRepository } from './repositories/forget-password.repository';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { SendForgetPasswordOtpUsecase } from './usecases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUsecase } from './usecases/verify-forget-password-otp.usecase';
import { ResetPasswordUsecase } from './usecases/reset-password.usecase';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({

    imports:[MongooseModule.forFeature([{
         name:ModelNames.FORGET_PASSWORD,
         schema:ForgetPasswordSchema
    }]),UsersModule,MailModule],
    providers:[ForgetPasswordRepository, ForgetPasswordService,SendForgetPasswordOtpUsecase,VerifyForgetPasswordOtpUsecase,ResetPasswordUsecase],
    controllers: [ForgetPasswordController]
})
export class ForgetPasswordModule {
    

}
