import { AuthService } from '@/src/auth/auth.service';
import { ForgotPasswordDto, SignInDto, SignUpDto } from '@/src/auth/dto';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private authServ: AuthService
  ){}

  @ApiBody({
    type: SignInDto,
    isArray: false
  })

 @Post('signin') signin(@Body() body: SignInDto){
  return this.authServ.signIn(body);
 }
 
 @Post('signup') signup(@Body() body: SignUpDto){
  
 }

 @Post('forgot-password') fg(@Body() body: ForgotPasswordDto){

 }
}
