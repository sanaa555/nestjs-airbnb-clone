import { Module } from '@nestjs/common';

import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { SystemAdminsModule } from './system-admins/system-admins.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
@Module({
  imports: [CoreModule, UsersModule, AuthModule, CountriesModule, CitiesModule, CurrenciesModule,UnitCategoriesModule, AppSettingsModule, SystemAdminsModule ],

  controllers: [],

providers: [
    
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    }
  ],
})

export class AppModule {}
