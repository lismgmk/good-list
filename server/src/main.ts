import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
}

bootstrap();
