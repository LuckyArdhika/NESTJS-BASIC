import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@/src/error/filter/all-exeception.filter';
import helmet from 'helmet';
import { configureSwaggerDocs } from '@/src/swagger/swagger.setup';
import * as morgan from 'morgan';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const whitelist = process.env.ALLOWED_CORS.split(',');
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }},
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
  });

  if (['local', 'dev', 'test'].includes(process.env.NODE_ENV)){
    app.use(morgan('dev'));
  } 

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'",  "'unsafe-inline'"],
      },
    }
  }));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  configureSwaggerDocs(app);

  await app.listen(process.env.PORT || 3000, () => console.log("[+] Listening on port ", process.env.PORT));
}

bootstrap();
