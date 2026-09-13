import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterDto } from "../dtos/register.dto";
import { UsersService } from "src/users/users.service";
import { GenerateTokensUsecase } from "./generateTokens.usecase";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { plainToInstance } from "class-transformer";
import { Roles } from "src/common/constants";

@Injectable()
export class RegisterUseCase{
    constructor(private readonly userService: UsersService,
                  private readonly   generateTokensUsecase:GenerateTokensUsecase,



    ){}

async  excute(body:RegisterDto):Promise<AuthResponseDto>{
    const createUserDto:CreateUserDto={...body}
        // 1-create a new user in the database using the data from the body
      const createdUser=  await this.userService.create(createUserDto);


        //2-generate a JWT token for the user(acess token and  refresh token)

        const         {accessToken,refreshToken}
= await this.generateTokensUsecase.excute({id:createdUser._id.toString(),
    role:Roles.USER
})



        //3-return the token to the user
                      return plainToInstance(AuthResponseDto,{accessToken,refreshToken})
      

    }
}