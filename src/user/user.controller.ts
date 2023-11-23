import { AuthGuard } from '@/src/auth/guards/auth.guard';
import { RolesGuard, UseRoles } from '@/src/auth/guards/role.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(
    private prisma: PrismaClient
  ){}

  @UseRoles(['admin']) @UseGuards(AuthGuard, RolesGuard)
  @Get() async getMany(){
    return await this.prisma.users.findMany({select: {id: true, email: true, firstName: true, lastName: true, verifiedEmail: true, createdAt: true}});
  }
}
