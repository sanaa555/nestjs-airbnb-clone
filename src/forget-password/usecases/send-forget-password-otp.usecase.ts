import { Injectable } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repositories/forget-password.repository";
import { UsersService } from "src/users/users.service";
import { MailService } from "src/mail/mail.service";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class SendForgetPasswordOtpUsecase{
    constructor(
        private readonly forgetPasswordRepository:ForgetPasswordRepository,
         private readonly usersService:UsersService,
                private readonly mailService:MailService
            ){}

    async excute( email :string):Promise<void>{

        //check if there  is  user with this email
        const existedUser = await this.usersService.findOne({email})
        if(!existedUser) throw new BadRequestException('user not found')
        //generate code and expiry time
         const code=  this.generateOtp()
         const expiresAt=new Date()
         expiresAt.setMinutes(expiresAt.getMinutes() +10)
        //save code and expiry time to db
          await this.forgetPasswordRepository.findOneAndUpdate({email},{
            code,expiresAt,isVerified:false
          },{upsert:true})
        //send email with code to user
           await this.mailService.sendEmail({
            to:email,
            subject:'forget password Otp',
            text:`Your forget password code is${code}`
           })

    }
    private  generateOtp():number{
      return Math.floor(100000+Math.random()*900000)
    }
}