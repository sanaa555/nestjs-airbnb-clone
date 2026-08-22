import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './common/configration/env-schema-validation';
import configMapping from './common/configration/config-mapping';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';
import { Environment } from './common/configration/environment.interface';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
@Global()
@Module({
    imports: [

        ConfigModule.forRoot({
    isGlobal: true,
      envFilePath: '.env',
      validationSchema:envSchema,
      load: [configMapping]

  }),
     I18nModule.forRootAsync({
      inject: [ConfigService],

        useFactory: (configService:ConfigService<Environment>) => ({

               
      fallbackLanguage: configService.getOrThrow<string>('FallbackLanguage'),

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

    }),
      MongooseModule.forRootAsync({

  inject: [ConfigService],

  useFactory: (configService: ConfigService<Environment>) => {
   const uri=configService.getOrThrow<string>('mongodbUri')
   return {uri} 
  },
}),
  ],
    providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],

})
export class CoreModule {}
