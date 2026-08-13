import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './common/configration/env-schema-validation';
import configMapping from './common/configration/config-mapping';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';
import { CustomI18nService } from './i18n/custom-i18n.services';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
      envFilePath: '.env',
      validationSchema:envSchema,
      load: [configMapping]

  }),
     I18nModule.forRoot({
      fallbackLanguage: 'en',

      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },

      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],

  controllers: [AppController],

  providers: [
    AppService,
    // CustomI18nService,
    {provide:APP_FILTER, useClass:CustomExceptionFilter}

  ],
})

export class AppModule {}
