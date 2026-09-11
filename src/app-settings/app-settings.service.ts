import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import {  FindAppSettingsUseCase } from './use-cases/find-app-settings-usecase';

@Injectable()
export class AppSettingsService {
    constructor(private readonly upsertAppSettingsUseCase:UpsertAppSettingsUseCase,
                private readonly findAppSettingsUseCase:FindAppSettingsUseCase
    ){}

    async upsert(body:UpsertAppSettingDto):Promise<AppSettingsResponseDto>{

      return   this.upsertAppSettingsUseCase.excute(body)

    }

    async find ():Promise<AppSettingsResponseDto>{

      return this.findAppSettingsUseCase.excute()

    }
}
