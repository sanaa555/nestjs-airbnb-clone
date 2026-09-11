import { Injectable } from "@nestjs/common";
import { ApppSettingsRepository } from "../repositories/app-settings.repository";
import { AppSettingsResponseDto } from "../dtos/app-settings-response.dto";
import { plainToInstance } from "class-transformer";
import { UpsertAppSettingDto } from "../dtos/upsert-app-settings.dto";

@Injectable()
export class UpsertAppSettingsUseCase{
    constructor(
        private readonly apppSettingsRepository:ApppSettingsRepository
    ){}
    async excute(body:UpsertAppSettingDto):Promise<AppSettingsResponseDto>{

        // {}=> first document if exist           // if document not exist ==> upsert

     const appSettings=   await this.apppSettingsRepository.findOneAndUpdate({},
            {$set:body},
            {upsert:true,returnDocument:'after' , lean:true}
        )

       
         return plainToInstance(AppSettingsResponseDto,appSettings)
    }
}