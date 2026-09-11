import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';

@Injectable()
export class AppSettingsService {
    constructor(private readonly upsertAppSettingsUseCase:UpsertAppSettingsUseCase){}

    async upsert(body:UpsertAppSettingDto):Promise<AppSettingsResponseDto>{

      return   this.upsertAppSettingsUseCase.excute(body)

    }
}
