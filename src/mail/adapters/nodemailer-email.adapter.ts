import { Injectable } from "@nestjs/common";
import { EmailAdapterInterface } from "../interfaces/email-adapter-interface";
import { SendEmailDto } from "../dtos/send-email.dto";
import * as nodemailer from 'nodemailer'
import { ConfigService } from "@nestjs/config";
import { Environment, ISmtp } from "src/common/configration/environment.interface";

@Injectable()
export class NodeMailerAdapter implements EmailAdapterInterface{
private readonly transporter:nodemailer.Transporter
constructor(
    private readonly configService:ConfigService<Environment>
){
     const smtp=this.configService.getOrThrow<ISmtp>('smtp')
        this.transporter=nodemailer.createTransport(smtp)
}
    async  sendEmail(dto:SendEmailDto):Promise<void>{

            // actual implementation
         await this.transporter.sendMail({
            from: dto.from, // sender address
            to: dto.to, // list of recipients
            subject: dto.subject, // subject line
            text: dto.text, // plain text body
        });
        }
    
}