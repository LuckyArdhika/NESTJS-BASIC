import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { EmailService } from '@/src/marketing/email/email.service';

@Module({
  providers: [AuthService, PrismaClient, EmailService],
  exports: [AuthService]
})
export class AuthModule {}
