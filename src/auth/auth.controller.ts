import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { RefreshDto } from './dto/refresh.dto'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './lib/jwt-auth.guard'
import { Meta } from './lib/meta.decorator'
import { User } from './lib/user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private user: UsersService, private auth: AuthService) {}

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.user.create(user)
  }

  @Post('login')
  login(@Meta() meta: Meta, @Body() payload: LoginDto) {
    return this.auth.createSession(payload, meta)
  }

  @Post('logout')
  logout(@Body() payload: RefreshDto) {
    this.auth.destroySession(payload)
  }

  @Post('refresh')
  refresh(@Meta() meta: Meta, @Body() payload: RefreshDto) {
    return this.auth.refreshSession(payload, meta)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@User() user: User) {
    return user
  }
}
