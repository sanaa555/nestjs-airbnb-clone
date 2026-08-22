import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './common/configration/environment.interface';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, INestApplication, Logger } from '@nestjs/common';
import {  I18nValidationPipe } from 'nestjs-i18n';
import { SwaggerConfig } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
  logger: new ConsoleLogger({
    json: process.env.NODE_ENV==='production'
,
  }),
});

  // to use i18n in your Dto validation
   app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

 // setup swagger
 SwaggerConfig.setup(app)

  const configService = app.get(ConfigService<Environment>);
  const port=configService.getOrThrow<number>('port')
    await app.listen(port);
    Logger.log(`Server is running on port ${port}`);

}
bootstrap();
