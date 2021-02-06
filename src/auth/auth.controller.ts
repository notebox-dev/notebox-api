import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { SigninDto } from './dto/signin.dto'

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }

  @Post('signin')
  async signin(@Body() credentials: SigninDto) {
    return this.authService.createSession(credentials)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Request() request) {
    return request.user
  }
}
