import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { OTPRepository } from './repositories/otp.repository';
import { OtpSchema } from './schemas/otp.schema';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ModelNames.OTP, schema: OtpSchema }])
    ],
  controllers: [OtpController],
  providers: [OtpService,OTPRepository]
})
export class OtpModule {}
