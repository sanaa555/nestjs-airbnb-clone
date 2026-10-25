import { Inject, Injectable, Logger } from '@nestjs/common';
import  type{ EmailAdapterInterface } from './interfaces/email-adapter-interface';
import { SendEmailDto } from './dtos/send-email.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { EMAIL_ADAPTER } from './constants/mail.constant';

@Injectable()
export class MailService {
    private logger = new Logger(MailService.name)

    constructor (
        @Inject(EMAIL_ADAPTER)
         private readonly emailAdapter:EmailAdapterInterface
    ){}

    async sendEmail(dto:SendEmailDto):Promise<void>{

          try{
         
            await this.emailAdapter.sendEmail(dto)

          }catch(e){
             this.logger.error('failed to send email',e)
             throw new BadRequestException('failed to send email')
          }
    }
    
}
