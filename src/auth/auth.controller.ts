import { AuthGuard } from '@/src/auth/guards/auth.guard';
import { AuthService } from '@/src/auth/auth.service';
import { ForgotPasswordDto, ResetPasswordPostDto, ResetPasswordPostTokenDto, SignInDto, SignInSchema, SignUpDto } from '@/src/auth/dto';
import { Controller, Post, Body, Res, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {Request, Response} from 'express';
import { Roles, UseRoles } from '@/src/auth/guards/role.guard';
import { RolesGuard } from './guards/role.guard';

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

 @Post('signin') signin(@Body() body: SignInDto, @Res({passthrough: true}) res: Response){
  return this.authServ.signIn(body, res);
 }
 
 @Post('signup') signup(@Body() body: SignUpDto){
  return this.authServ.signUp(body);
 }

 @Post('forgot-password') fg(@Body() body: ForgotPasswordDto){
  return this.authServ.forgotPassword(body);
 }

 @Get('reset-password') rp(@Query() query: ResetPasswordPostTokenDto){
  return this.authServ.resetPassword(query.token);
 } 
 
 @Post('reset-password') rpp(@Req() req: Request, @Body() body: ResetPasswordPostDto, @Query() query: ResetPasswordPostTokenDto){
  return this.authServ.resetPasswordPost(body, query.token);
 }

 @Get() open(){
  return "v1";
 }

 @UseGuards(AuthGuard)
 @Get('protected') protected(){
   return 1;
  }
  
@UseRoles([Roles.admin])
 @UseGuards(AuthGuard, RolesGuard)
 @Get('protected-roles') protectedRoles(){
   return 1;
 }
}
