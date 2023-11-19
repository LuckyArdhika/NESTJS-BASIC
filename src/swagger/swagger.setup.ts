import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';

const SWAGGER_ENVS = ['local', 'dev', 'staging'];

export function configureSwaggerDocs(
  app: INestApplication,
) {
  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(
      ['/docs', '/docs-json', '/docs-yaml'],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]:
            process.env.SWAGGER_PASSWORD,
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle("KLAIEN API")
      .setDescription("Collagen is a mobile app that runs on NestJS framework. This is the API documentation created by Back-End development team.")
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }
}
