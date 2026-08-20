import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refersh-token.dto';
import { RegisterUseCase } from './use-cases/register.usecase';
import { loginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';

@Injectable()
export class AuthService {

    constructor( 
               private readonly registerUseCase:RegisterUseCase,
                private readonly loginUseCase:loginUseCase,
                private readonly refreshTokenUseCase:RefreshTokenUseCase,
    ) {}

   async  register(body:RegisterDto){
     return this.registerUseCase.excute(body)
    }

    async login (body:LoginDto){

       return   this.loginUseCase.excute(body)

        }
    

     async  RefreshToken (body:RefreshTokenDto){
      
       return this.refreshTokenUseCase.excute(body)      

       }

    }


    
