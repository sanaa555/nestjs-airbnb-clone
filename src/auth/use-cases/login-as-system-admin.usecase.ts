import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GenerateTokensUsecase } from "./generateTokens.usecase";
import { SystemAdminsService } from "src/system-admins/system-admins.service";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { LoginDto } from "../dtos/login.dto";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import bcrypt from'bcrypt'
import { plainToInstance } from "class-transformer";

@Injectable()
export class LoginAsSystemAdminUseCase{
    constructor(
        private readonly generateTokensUsecase:GenerateTokensUsecase,
        private readonly systemAdminsService:SystemAdminsService
        
    ){}

    async excute(body:LoginDto):Promise<AuthResponseDto>{
   //find system admin by email
   const systemAdmin= await this.systemAdminsService.findone({
    email:body.email
   })
   if(!systemAdmin) throw new BadRequestException('invalid credentials')

   //if exist compare password

   const isPasswordMatched= await bcrypt.compare(
    body.password,
    systemAdmin.password
   )
   if(!isPasswordMatched) throw new BadRequestException('invalid credentials')
   //generate tokens

 const {accessToken,refreshToken}= await this.generateTokensUsecase.excute({id:systemAdmin._id.toString(),role:body.role})
    
                     //-return token
                         return plainToInstance(AuthResponseDto,{accessToken,refreshToken})




    }
}