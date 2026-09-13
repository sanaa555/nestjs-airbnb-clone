import { Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { UsersService } from "src/users/users.service";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { I18nService } from "nestjs-i18n";
import bcrypt from "bcrypt"
import { GenerateTokensUsecase } from "./generateTokens.usecase";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { plainToInstance } from "class-transformer";


@Injectable()
export class loginAsUserUseCase{

        private readonly logger = new Logger(loginAsUserUseCase.name)

    constructor(
        private readonly userService: UsersService,
                private readonly i18nService:I18nService,
                private readonly generateTokensUsecase:GenerateTokensUsecase,
                
        

    ){}

    async excute (body:LoginDto):Promise<AuthResponseDto>{
            

          this.logger.log(` login request  for email: ${body.email}`)
            //1-find user by email
            const user= await this.userService.findOne({email:body.email})
            // if(!user) throw new BadRequestException("invalid credentials")
                    if(!user) throw new BadRequestException(
                         this.i18nService.translate( "auth.INVALID_CREDENTIALS")
                       )
    
            //2-compare password
            const isPasswordMatched= await bcrypt.compare(
               body.password,
                user.password,
    
                )
               if(!isPasswordMatched) throw new BadRequestException(
                         this.i18nService.translate( "auth.INVALID_CREDENTIALS")
                          )     
            //3-generate token
    
            const {accessToken,refreshToken}= await this.generateTokensUsecase.excute({id:user._id.toString(),role:body.role})
    
                     //4-return token
                         return plainToInstance(AuthResponseDto,{accessToken,refreshToken})
                     
    
    
    
            }
         

}