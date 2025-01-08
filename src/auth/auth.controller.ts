import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Auth( ValidRoles.user )
  @Get('private1')
  privateRoute(
    @Req() req: Express.Request,
  ) { 
    return req.user
  }

  @Auth( ValidRoles.administrator )
  @Get('private2')
  privateRoute2(
    @Req() req: Express.Request,
  ) { 
    return req.user
  }


}
