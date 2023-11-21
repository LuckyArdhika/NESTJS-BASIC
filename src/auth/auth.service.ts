import { compare, hash } from '@/src/EnH/hash.fn-service';
import { sign, verify } from '@/src/EnH/jwt.fn-service';
import { ForgotPasswordDto, ResetPasswordPostDto, SignInDto, SignUpDto } from '@/src/auth/dto';
import { generateResetPasswordPage } from '@/src/auth/template';
import { EmailService } from '@/src/marketing/email/email.service';
import { Injectable, NotFoundException, ForbiddenException, UnprocessableEntityException, GoneException, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private emailServ: EmailService
  ){}

  async signIn(body: SignInDto, res: Response){
    const user = await this.prisma.users.findUnique({where: {email: body.email}});
    if (!user) throw new NotFoundException("User is not registered");

    // compare passwd
    if (!compare(body.password, user.password)) throw new ForbiddenException("Wrong password");

    // set cookie
    const date = new Date();
    if (body.remember_me) {
      date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    } else {
      date.setTime(date.getTime());
    }
    
    res.cookie('Authorization', sign({id: user.id, email: user.email}), {expires: date, httpOnly: true, sameSite: true, secure: true});
    return user;
  }

  async signUp(body: SignUpDto){
    const user = await this.prisma.users.findUnique({where: {email: body.email}});
    if (user) throw new GoneException("Email already registered, please login");

    return await this.prisma.users.create({data: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password
    }});
  }

  generateFGLink(secret){
    return `${process.env.ORIGIN}/auth/reset-password?token=${secret}`;
  }

  async forgotPassword(@Body() body: ForgotPasswordDto){
    const user = await this.prisma.users.findUnique({where: {email: body.email}});
    if (user){
      this.emailServ.sendEmail({
        useTemplate: 'FG',
        sender: process.env.FORGOT_PASSWORD_EMAIL,
        receiver: user.email,
        templateOptions: {
          link: this.generateFGLink(sign({email: body.email}, 0.08333)) // 5 minutes
        }
      });
    }

    return "ok";
  }

  resetPassword(token){
    // if (!verify(token)) throw new ForbiddenException("Can not validate its you, maybe the token incorrect or has been expired.");
    
    return generateResetPasswordPage();
  }
  
  async resetPasswordPost(body: ResetPasswordPostDto, token){
    const verified = verify(token);
    if (!verified) throw new ForbiddenException("Can not validate its you, maybe the token incorrect or has been expired.");
    
    const payloadInside: {email: string} = verified as any;
    return await this.prisma.users.update({where: {email: payloadInside.email}, data: {password: hash(body.newPassword)}});
  }
}
