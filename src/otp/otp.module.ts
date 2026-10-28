import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { OTPRepository } from './repositories/otp.repository';
import { OtpSchema } from './schemas/otp.schema';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { SendOtpUsecase } from './usecases/send-otp.usecase';
import { VerifyOtpUsecase } from './usecases/verify-otp.usecase';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { FindOtpRawUsecase } from './usecases/find-otp-raw.usecase';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ModelNames.OTP, schema: OtpSchema }]),UsersModule,MailModule
    ],
  controllers: [OtpController],
  providers: [OtpService,OTPRepository,SendOtpUsecase,VerifyOtpUsecase,FindOtpRawUsecase],
  exports:[OtpService]
})
export class OtpModule {}
