import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/common/swagger';
import { FindAppSettingsSwagger } from './swagger/find-app-settings.swagger';
import { UpsertAppSettingsSwagger } from './swagger/upsert-app-settings.swagger';

@ApiTags(API_TAGS.APP_SETTINGS)
@Controller('app-settings')
export class AppSettingsController {
    constructor(
        private readonly appSettingsService:AppSettingsService
    ){}

    @UpsertAppSettingsSwagger()
    @Put()
    async upsertAppSettings(@Body() body:UpsertAppSettingDto):Promise<AppSettingsResponseDto>{
        return this.appSettingsService.upsert(body)
    }

    @FindAppSettingsSwagger()
    @Get()
    async findAppSettings():Promise<AppSettingsResponseDto>{

        return this.appSettingsService.find()

    }
}
