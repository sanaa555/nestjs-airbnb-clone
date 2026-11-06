import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/common/configration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { refreshTokenSchema } from './schemas/refresh-token';
import { RegisterUseCase } from './use-cases/register.usecase';
import { GenerateTokensUsecase } from './use-cases/generateTokens.usecase';
import { loginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { ModelNames } from 'src/common/data-access';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { loginAsUserUseCase } from './use-cases/login-as-user.usecase';
import { SystemAdminsModule } from 'src/system-admins/system-admins.module';
import { LoginAsSystemAdminUseCase } from './use-cases/login-as-system-admin.usecase';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [UsersModule,SystemAdminsModule,OtpModule,
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService<Environment>)=>({
        secret:configService.getOrThrow('jwtSecret'),
        signOptions:{expiresIn:configService.getOrThrow('acessTokenExpireIn')}
      })

      
    }),
    MongooseModule.forFeature([
      {
        name: ModelNames.REFRESHTOKENS,schema:refreshTokenSchema
      
      },
    ]),

    
  ],
  providers: [AuthService,RegisterUseCase,GenerateTokensUsecase,loginUseCase,RefreshTokenUseCase,RefreshTokenRepository,loginAsUserUseCase,LoginAsSystemAdminUseCase],
  controllers: [AuthController],
  exports:[JwtModule,UsersModule,SystemAdminsModule]
})
export class AuthModule {}
