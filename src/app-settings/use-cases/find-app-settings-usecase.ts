import { Injectable } from "@nestjs/common";
import { ApppSettingsRepository } from "../repositories/app-settings.repository";
import { AppSettingsResponseDto } from "../dtos/app-settings-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindAppSettingsUseCase{
    constructor(
                private readonly apppSettingsRepository:ApppSettingsRepository
        
    ){}

    async excute():Promise<AppSettingsResponseDto>{
        // {}=> first document

        const appSettings= await this.apppSettingsRepository.findOne({})
        
         return plainToInstance(AppSettingsResponseDto,appSettings)


        

    }
}