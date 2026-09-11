import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';

@Controller('app-settings')
export class AppSettingsController {
    constructor(
        private readonly appSettingsService:AppSettingsService
    ){}

    @Put()
    async upsertAppSettings(@Body() body:UpsertAppSettingDto):Promise<AppSettingsResponseDto>{
        return this.appSettingsService.upsert(body)
    }

    @Get()
    async findAppSettings():Promise<AppSettingsResponseDto>{

        return this.appSettingsService.find()

    }
}
