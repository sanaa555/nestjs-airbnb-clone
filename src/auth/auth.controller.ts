import { Body, Controller, Get, Post } from '@nestjs/common';
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
import { CurrentAccount, Principale } from './decorators/current-account.decorator';
@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) {}

    @Public()
   @SignupSwagger()
    @Post('register')
    async register(@Body() body: RegisterDto):Promise<AuthResponseDto> {
       return    await this.authService.register(body);


    }

   @Public()
   @LoginSwagger()
    @Post('login')
    async login(@Body() body: LoginDto):Promise<AuthResponseDto> {

       return    await this.authService.login(body);


    }



    @Public()
    @RefreshTokenSwagger()
    @Post('refresh-token')
    async refreshToken(@Body() body: RefreshTokenDto) :Promise<AuthResponseDto>{
       return    await this.authService.RefreshToken(body);


    }

   @Get('me')
async getMe(@CurrentAccount() principale: Principale) {
  return principale
}
    


}
