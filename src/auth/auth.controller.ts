import { AuthService } from '@/src/auth/auth.service';
import { ForgotPasswordDto, ResetPasswordPostDto, ResetPasswordPostTokenDto, SignInDto, SignInSchema, SignUpDto } from '@/src/auth/dto';
import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {Response} from 'express';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private authServ: AuthService
  ){}

  @ApiBody({
    schema: SignInSchema as any,
    isArray: false
  })

 @Post('signin') signin(@Body() body: SignInDto, @Res() res: Response){
  return this.authServ.signIn(body, res);
 }
 
 @Post('signup') signup(@Body() body: SignUpDto){
  return this.authServ.signUp(body);
 }

 @Post('forgot-password') fg(@Body() body: ForgotPasswordDto){
  return this.authServ.forgotPassword(body);
 }

 @Get('reset-password') rp(@Query('token') token){
  return this.authServ.resetPassword(token);
 } 

 @Post('reset-password') rpp(@Body() body: ResetPasswordPostDto, @Query('token') token: ResetPasswordPostTokenDto){
  return this.authServ.resetPasswordPost(body, token);
 }
}
