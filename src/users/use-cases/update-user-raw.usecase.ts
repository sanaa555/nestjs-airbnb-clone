import { Injectable } from "@nestjs/common";
import { ClientSession, QueryFilter } from "mongoose";
import { UserRepository } from "../repository/user.repository";
import { User } from "../schemas/user.schema";

@Injectable()

export class UpdateUserRawUsecase{
    constructor(
    private readonly userRepository:UserRepository
        
    ){}


    async excute(query:QueryFilter<User>,data:Record<string,any>,session?:ClientSession):Promise<void>{

        await this.userRepository.findOneAndUpdate(query,data,{session})

        
    }
}