import { AuthService } from '@/src/auth/auth.service';
import { ForgotPasswordDto, SignInDto, SignUpDto, signInSchema } from '@/src/auth/dto';
import { ZodValidationPipe } from '@/src/auth/pipe/zod-validation.pipe';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private authServ: AuthService
  ){}

 @UsePipes(new ZodValidationPipe(signInSchema))
 @Post('signin') signin(@Body() body: SignInDto){
  return this.authServ.signIn(body);
 }
 
 @Post('signup') signup(@Body() body: SignUpDto){
  
 }

 @Post('forgot-password') fg(@Body() body: ForgotPasswordDto){

 }
}
