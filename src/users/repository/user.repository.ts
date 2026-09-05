import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { HydratedDocument, Model } from "mongoose";
import { User } from "../schemas/user.schema";


@Injectable()
export class UserRepository extends BaseRepository<User>{
    constructor(

        
                        @InjectModel(ModelNames.USERS)
                        private readonly userModel:Model<HydratedDocument<User>>
    ){
            super(userModel)

    }
}