import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerConfig } from './docs/swagger.doc';
import { LoggingInterceptor, TimeoutInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TimeoutInterceptor(), new LoggingInterceptor());

  app.setGlobalPrefix('api/v1');

  swaggerConfig(app);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<string>('port');
  const nodeEnv = config.get<string>('nodeEnv');

  await app.listen(port, () =>
    logger.log(`server is running in ${nodeEnv} mode`),
  );
}
bootstrap();
