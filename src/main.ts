import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './common/configration/environment.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Environment>);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
