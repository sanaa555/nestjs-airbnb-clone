import { Body, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterDto } from "../dtos/register.dto";
import { UsersService } from "src/users/users.service";
import { GenerateTokensUsecase } from "./generateTokens.usecase";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { plainToInstance } from "class-transformer";
import { Roles } from "src/common/constants";
import { OtpService } from "src/otp/otp.service";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class RegisterUseCase{
    constructor(private readonly userService: UsersService,
                  private readonly   generateTokensUsecase:GenerateTokensUsecase,
                  private readonly OtpService:OtpService
    ){}

async  excute(body:RegisterDto):Promise<AuthResponseDto>{
    
    const createUserDto:CreateUserDto={...body}
      // check verification of email 
        await this.ValidateEmailVerification(body.email)
        // 1-create a new user in the database using the data from the body
      const createdUser=  await this.userService.create(createUserDto);


        //2-generate a JWT token for the user(acess token and  refresh token)
const {accessToken,refreshToken}= await this.generateTokensUsecase.excute({id:createdUser._id.toString(),
    role:Roles.USER
})



        //3-return the token to the user
         return plainToInstance(AuthResponseDto,{accessToken,refreshToken})


    }

    private async ValidateEmailVerification(email:string){
       const otp=await this.OtpService.findRawOtp({email})
       if( !otp || !otp.isVerified) throw new BadRequestException('Email is not verified,please verify your email first')
    }
}