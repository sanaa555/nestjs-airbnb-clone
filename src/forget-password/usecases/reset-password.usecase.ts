import { Injectable, Logger } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repositories/forget-password.repository";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { UsersService } from "src/users/users.service";
import bcrypt from 'bcrypt'


@Injectable()
export class ResetPasswordUsecase{
    private loggr=new Logger(ResetPasswordUsecase.name)
    constructor(
        @InjectConnection() 
        private readonly connection:Connection,
        private readonly forgetPasswordRepository:ForgetPasswordRepository,
        private readonly usersService:UsersService
    ){}

    async excute( body :ResetPasswordDto):Promise<void>{
        // make sure if forget password otp is verified

        const forgetPassword= await this.forgetPasswordRepository.findOne({
            email:body.email
        })

        if(!forgetPassword) throw new BadRequestException('Invalid email')
        if(!forgetPassword.isVerified) throw new BadRequestException('code not verified')


            //start transaction (update user password and delete forget password document)
            // start session
            const session = await this.connection.startSession()

             try{

               await session.startTransaction()
               // operations
               const hashedPassword= await bcrypt.hash(body.newPassword,10)

               //update user password

                 await this.usersService.UpdateUserRaw({email:body.email},{password:hashedPassword},session)
                  
                 // delete forget password document

                 await this.forgetPasswordRepository.findOneAndDelete({email:body.email},{session})
                 
                 await session.commitTransaction()
              
             }
             catch(e){
                 this.loggr.error('failed to reset password',e)
                 await  session.abortTransaction()
                 throw new BadRequestException('failed to reset password')

             }finally{
                await session.endSession()
             }

    }
}