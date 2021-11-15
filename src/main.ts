import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(3000);
}
bootstrap();
