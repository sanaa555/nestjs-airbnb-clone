import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { HydratedDocument, Model } from "mongoose";
import { RefreshToken } from "src/auth/schemas/refresh-token";


@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken>{
    constructor(

        
                        @InjectModel(ModelNames.REFRESHTOKENS)
                        private readonly refreshTokenModel:Model<HydratedDocument<RefreshToken>>
    ){
            super(refreshTokenModel)

    }
}