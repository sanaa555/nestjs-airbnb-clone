import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
// import { InjectModel } from "@nestjs/mongoose";
// import { RefreshToken } from "../schemas/refresh-token";
// import { Model } from "mongoose";
import { Environment } from "src/common/configration/environment.interface";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcrypt"
// import { ModelNames } from "src/common/data-access";
import { RefreshTokenRepository } from "../repository/refresh-token.repository";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


@Injectable()
export class GenerateTokensUsecase{
    constructor(        
        private readonly jwtService: JwtService,
        // @InjectModel(ModelNames.REFRESHTOKENS) private refreshModel: Model<RefreshToken>,
                private readonly refreshTokenRepository: RefreshTokenRepository,

        private readonly configService:ConfigService<Environment>,
                
    ){}

    //   async excute(userId:string){
           async excute(payload:JwtPayload){

            const accessToken=  await this.jwtService.signAsync(payload)
            const refreshToken= await this.jwtService.signAsync({...payload,type:this.configService.getOrThrow('type')},
                {expiresIn:this.configService.getOrThrow('refreshTokenExpireIn')} )
    
                // hash refersh token 
    
                const hashedRefreshToken =  await bcrypt.hash(refreshToken,10)
    
                // update refresh token for the userId  if not exists create it
    
                await this.refreshTokenRepository.findOneAndUpdate(
                    {userId:payload.id.toString()},
                    {refreshToken:hashedRefreshToken},
                    {returnDocument: 'after',upsert:true}
                )
    
            return {accessToken,refreshToken}
    
    
        }
}