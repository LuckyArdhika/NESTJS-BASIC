import { verify } from '@/src/EnH/jwt.fn-service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private prisma: PrismaClient
  ){}

  async canActivate(
    context: ExecutionContext,
  ) {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const payload: {email: string} = verify(request.cookies["Authorization"]) as any;
      request.user = await this.prisma.users.findUnique({where: {email: payload.email}, include: {roles: {include: {role: true}}}});
      return true;
    } catch (err) {
      return false;
    }

  }
}
