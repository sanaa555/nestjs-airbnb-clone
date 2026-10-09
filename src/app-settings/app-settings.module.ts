import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettingsSchema } from './schemas/app-settings.schema';
import { ModelNames } from 'src/common/data-access';
import { ApppSettingsRepository } from './repositories/app-settings.repository';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings-usecase';

@Module({
    imports:[MongooseModule.forFeature([{ name: ModelNames.APP_SETTINGS, schema: AppSettingsSchema }])],
  
  providers: [AppSettingsService,ApppSettingsRepository,UpsertAppSettingsUseCase,FindAppSettingsUseCase],
  controllers: [AppSettingsController],
  exports:[AppSettingsService]
})
export class AppSettingsModule {}
