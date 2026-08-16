import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {

    constructor( private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly i18nService:I18nService

    ) {}

   async  register(body:RegisterDto){
    const createUserDto:CreateUserDto={...body}
        // 1-create a new user in the database using the data from the body
      const createdUser=  await this.userService.create(createUserDto);


        //2-generate a JWT token for the user(acess token and  refresh token)

        const tokens= await this.generateTokens(createdUser._id.toString())



        //3-return the token to the user
        return tokens
    }

    async login (body:LoginDto){

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

        const tokens= await this.generateTokens(user._id.toString())

                 //4-return token
                                 return tokens



        }
        private async generateTokens(userId:string){
        const accessToken=  await this.jwtService.signAsync({userId})

        return {accessToken}


    }



    }


    
