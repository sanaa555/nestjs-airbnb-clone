import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refersh-token.dto';
import { RegisterUseCase } from './use-cases/register.usecase';
import { loginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Injectable()
export class AuthService {


     
    constructor( 
               private readonly registerUseCase:RegisterUseCase,
                private readonly loginUseCase:loginUseCase,
                private readonly refreshTokenUseCase:RefreshTokenUseCase,
    ) {}

   async  register(body:RegisterDto):Promise<AuthResponseDto>{
     return this.registerUseCase.excute(body)
    }

    async login (body:LoginDto):Promise<AuthResponseDto>{

       return   this.loginUseCase.excute(body)

        }
    

     async  RefreshToken (body:RefreshTokenDto):Promise<AuthResponseDto>{
      
       return this.refreshTokenUseCase.excute(body)      

       }

    }


    
