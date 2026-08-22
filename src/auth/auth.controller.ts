import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refersh-token.dto';
import {  ApiTags } from '@nestjs/swagger';
import { SignupSwagger } from './swagger/register.swagger';
import { API_TAGS } from 'src/common/swagger';
import { LoginSwagger } from './swagger/login.swagger';
import { RefreshTokenSwagger } from './swagger/refresh-token.swagger';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) {}
   @SignupSwagger()
    @Post('register')
    async register(@Body() body: RegisterDto) {
       return    await this.authService.register(body);


    }


   @LoginSwagger()
    @Post('login')
    async login(@Body() body: LoginDto) {

       return    await this.authService.login(body);


    }



  
    @RefreshTokenSwagger()
    @Post('refresh-token')
    async refreshToken(@Body() body: RefreshTokenDto) {
       return    await this.authService.RefreshToken(body);


    }
    


}
