import { Injectable } from "@nestjs/common";
import { OTPRepository } from "../repositories/otp.repository";
import { UsersService } from "src/users/users.service";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class SendOtpUsecase{
    constructor(
        private readonly otpRepository:OTPRepository,
        private readonly usersService:UsersService,
        private readonly mailService:MailService
    ){}


    async excute(email:string):Promise<void>{

        //1-CHECK IF email already verified ==> true ==>check if there is user with this verified  email
        //==> true=======>return bad request email already verified

        await this.validateBeforeSendOtp(email)

              //2-generate 6 digits code
           const code= this.generateOtp()
           const expiresAt=new Date()
           expiresAt.setMinutes(expiresAt.getMinutes() +10)


        //save code in db(update or insert )

        await this.otpRepository.findOneAndUpdate(
             {email},
            {code,expiresAt,isVerified:false} ,{upsert:true}  )

        // send code to user via email

        await this.mailService.sendEmail({
            to:email,
            subject:'otp verification code',
            text:`your otp is ${code}`
        })


      
         


    }
    private async validateBeforeSendOtp(email:string):Promise<void>{
             const otpExistanceAndVerified = await this.otpRepository.findOne({
            email,
            isVerified:true

        })
        if(otpExistanceAndVerified){
         const ExistanceUser=await this.usersService.findOne({email})
         if(ExistanceUser) throw new BadRequestException('email already verified')
        }
 
        }
    private  generateOtp():number{
        return Math.floor(100000+Math.random()*900000)

    }
}