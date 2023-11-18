import { SignInDto } from '@/src/auth/dto';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient
  ){}

  async signIn(body: SignInDto){
    const user = await this.prisma.users.findUniqueOrThrow({where: {email: body.email}});
    
    // compare passwd
    // set cookie

    return user;
  }
}
