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
  async signin(@Request() request: Request, @Body() credentials: SigninDto) {
    const ip = (request as any).ip
    const userAgent = request.headers['user-agent']

    return this.authService.createSession(credentials, { ip, userAgent })
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Request() request: any) {
    return request.user
  }
}
