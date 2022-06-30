import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Exemplo Descomplicando Nestjs')
    .setDescription('Descricao da API Descomplicando Nestjs')
    .setVersion('0.0.1')
    .addTag('users')
    .addTag('roles')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
