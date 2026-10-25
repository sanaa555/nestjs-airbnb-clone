import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { NodeMailerAdapter } from './adapters/nodemailer-email.adapter';
import { EMAIL_ADAPTER } from './constants/mail.constant';
import { MailController } from './mail.controller';

@Module({
  providers: [MailService,{
    provide:EMAIL_ADAPTER,
    useClass:NodeMailerAdapter
  }],
  controllers: [MailController]
})
export class MailModule {}
