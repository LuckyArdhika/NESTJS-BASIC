import { verify } from '@/src/EnH/jwt.fn-service';
import { authError } from '@/src/error/dict/auth.error-dict';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private prisma: PrismaClient
  ){}

  async canActivate(
    context: ExecutionContext,
  ) {
    const request: Request = context.switchToHttp().getRequest();
    let user;
    try {
      const payload: {email: string} = verify(request.cookies["Authorization"]) as any;
      user = await this.prisma.users.findUniqueOrThrow({where: {email: payload.email, deletedAt: null}, include: {roles: {include: {role: true}}}});
    } catch (err) {
      throw new UnauthorizedException();
    }

    if (!user.verifiedEmail) throw new ForbiddenException({respCode: "auth.UNVERIFIED_EMAIL", message: authError["auth.UNVERIFIED_EMAIL"]});
    request.user = user;
    return true;
  }
}
