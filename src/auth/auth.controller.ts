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
import { AuthResponseDto } from './dtos/auth-response.dto';
import { Public } from './decorators/public.decorator';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
@Public()
export class AuthController {


    constructor(private readonly authService: AuthService) {}
   @SignupSwagger()
    @Post('register')
    async register(@Body() body: RegisterDto):Promise<AuthResponseDto> {
       return    await this.authService.register(body);


    }

   
   @LoginSwagger()
    @Post('login')
    async login(@Body() body: LoginDto):Promise<AuthResponseDto> {

       return    await this.authService.login(body);


    }



  
    @RefreshTokenSwagger()
    @Post('refresh-token')
    async refreshToken(@Body() body: RefreshTokenDto) :Promise<AuthResponseDto>{
       return    await this.authService.RefreshToken(body);


    }
    


}
