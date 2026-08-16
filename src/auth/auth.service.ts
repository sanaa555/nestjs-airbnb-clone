import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor( private readonly userService: UsersService,
        private jwtService: JwtService

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


    private async generateTokens(userId:string){
        const accessToken=  await this.jwtService.signAsync({userId})

        return {accessToken}


    }
}
