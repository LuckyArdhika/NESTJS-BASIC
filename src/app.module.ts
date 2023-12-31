import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AllExceptionsFilter } from '@/src/error/filter/all-exeception.filter';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { CaslModule } from './auth/casl/casl.module';
import { AuthModule } from '@/src/auth/auth.module';
import { ZodValidationPipe } from '@/src/auth/pipe/zod-validation.pipe';
import { MarketingModule } from './marketing/marketing.module';
import { PrismaClient } from '@prisma/client';
import { ResponseInterceptor } from '@/src/utils/interceptor/response.interceptor';

@Module({
  imports: [UserModule, 
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: Number(process.env.THROTTLE_TTL),
        limit: Number(process.env.THROTTLE_LIMIT)
      }]
    }), CaslModule, AuthModule, MarketingModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, UserService, PrismaService, PrismaClient,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    { // not work
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
