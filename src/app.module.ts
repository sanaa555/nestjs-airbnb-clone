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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { UnitsModule } from './units/units.module';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { BookingsModule } from './bookings/bookings.module';
import { UnitReviewsModule } from './unit-reviews/unit-reviews.module';
import { UnitFavouritesModule } from './unit-favourites/unit-favourites.module';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
@Module({
  imports: [CoreModule, UsersModule, AuthModule, CountriesModule, CitiesModule, CurrenciesModule,UnitCategoriesModule, AppSettingsModule, SystemAdminsModule, UnitsModule, FilesUploadModule, BookingsModule, UnitReviewsModule, UnitFavouritesModule, MailModule, OtpModule ],

  controllers: [],

providers: [
    
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    },
  
  {
      provide:APP_GUARD,
      useClass:RolesGuard
    },
  {
    provide:APP_INTERCEPTOR,
    useClass:TransformResponseInterceptor
  },
]
})

export class AppModule {}
