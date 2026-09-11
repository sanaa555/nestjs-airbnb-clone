import { Body, Controller, Post, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';

@Controller('app-settings')
export class AppSettingsController {
    constructor(
        private readonly appSettingsService:AppSettingsService
    ){}

    @Put()
    async upsertAppSettings(@Body() body:UpsertAppSettingDto){
        return this.appSettingsService.upsert(body)
    }
}
