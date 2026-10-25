import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendEmailDto } from './dtos/send-email.dto';

@Controller('mail')
export class MailController {
    constructor (
        private readonly mailService:MailService
    ){}

    @Public()
    @Post('/send')
    async sendEmail(@Body() dto:SendEmailDto):Promise<void>{

        return this.mailService.sendEmail(dto)

    }
}
