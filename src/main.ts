import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './common/configration/environment.interface';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { , I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // to use i18n in your Dto validation
   app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  const configService = app.get(ConfigService<Environment>);
  const port=configService.getOrThrow<number>('port')
    await app.listen(port);
    Logger.log(`Server is running on port ${port}`);

}
bootstrap();
