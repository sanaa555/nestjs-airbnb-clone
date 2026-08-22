import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/common/configration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { refreshTokenSchema, RefreshToken } from './schemas/refresh-token';
import { RegisterUseCase } from './use-cases/register.usecase';
import { GenerateTokensUsecase } from './use-cases/generateTokens.usecase';
import { loginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';

@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService<Environment>)=>({
        secret:configService.getOrThrow('jwtSecret'),
        signOptions:{expiresIn:configService.getOrThrow('acessTokenExpireIn')}
      })

      
    }),
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,schema:refreshTokenSchema
      
      },
    ]),

    
  ],
  providers: [AuthService,RegisterUseCase,GenerateTokensUsecase,loginUseCase,RefreshTokenUseCase],
  controllers: [AuthController]
})
export class AuthModule {}
