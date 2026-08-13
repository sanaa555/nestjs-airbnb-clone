import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './common/configration/environment.interface';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // app.useGlobalFilters(
  //   new I18nValidationExceptionFilter({detailedErrors: false})
  // );
  // app.useGlobalFilters( new CustomExceptionFilter());

  const configService = app.get(ConfigService<Environment>);
  const port=configService.getOrThrow<number>('port')
    await app.listen(port);
    Logger.log(`Server is running on port ${port}`);

}
bootstrap();
