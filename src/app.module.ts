import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AllExceptionsFilter } from '@/src/error/filter/all-exeception.filter';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { CaslModule } from './casl/casl.module';
import { AuthModule } from '@/src/auth/auth.module';
import { ZodValidationPipe } from '@/src/auth/pipe/zod-validation.pipe';
import { MarketingModule } from './marketing/marketing.module';

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
  providers: [AppService, UserService, PrismaService,
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
  ],
})
export class AppModule {}
