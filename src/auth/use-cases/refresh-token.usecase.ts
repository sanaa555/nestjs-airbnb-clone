import { Injectable } from "@nestjs/common";
import { RefreshTokenDto } from "../dtos/refersh-token.dto";
import { JwtService } from "@nestjs/jwt";
import { ForbiddenException } from "src/common/errors-handling/custom-exceptions/forbidden.exception";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken } from "../schemas/refresh-token";
import { Model } from "mongoose";
import bcrypt from "bcrypt"
import { GenerateTokensUsecase } from "./generateTokens.usecase";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { plainToInstance } from "class-transformer";
import { ModelNames } from "src/common/data-access";
import { RefreshTokenRepository } from "../repository/refresh-token.repository";
import { Roles } from "src/common/constants";


@Injectable()
export class RefreshTokenUseCase{

    constructor(
                private readonly jwtService: JwtService,
                    //     @InjectModel(ModelNames.REFRESHTOKENS) private refreshModel: Model<RefreshToken>,
                                    private readonly refreshTokenRepository: RefreshTokenRepository,
                    
                     private readonly generateTokensUsecase: GenerateTokensUsecase,

                
        
    ){}


    async  excute (body:RefreshTokenDto):Promise<AuthResponseDto>{
            //1-verify refeshToken
                type RefreshTokenPayload ={payload:{id:string,role:string},type:string}
               let decodedToken:RefreshTokenPayload
    
                try{
                            //1-verify refeshToken
    
                     decodedToken=  await this.jwtService.verifyAsync<RefreshTokenPayload>(body.refreshToken)
                }catch{
                throw new ForbiddenException('invalid refresh token')
                }
                
    
                     if(decodedToken.type !=='refresh'){
                throw new BadRequestException('invalid refresh token')
            
               }
    
               //3-check if refreshToken Exists
    
              const refreshTokenDoc=  await this.refreshTokenRepository.findOne({
                userId:decodedToken.payload.id
               })
    
               if(!refreshTokenDoc){
            throw new ForbiddenException('invalid refresh token')
               }
               //4-compare refreshtoken with hashed refreshToken
    
               const isRefreshTokenhMatched= await bcrypt.compare(body.refreshToken,refreshTokenDoc.refreshToken)
    
    
               if(!isRefreshTokenhMatched){
                        throw new ForbiddenException('invalid refresh token')
               }
                // 5-generate new tokens
    
                const {accessToken,refreshToken}= await this.generateTokensUsecase.excute({id:refreshTokenDoc.userId,role:decodedToken.payload.role as Roles})
                return plainToInstance(AuthResponseDto,{accessToken,refreshToken})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                
    
           }
}