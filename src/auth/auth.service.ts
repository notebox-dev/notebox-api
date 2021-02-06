import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private config: ConfigService,
  ) {}

  async createSession({ email }: any) {
    const user = await this.userService.findByEmail(email)
    const token = this.createJwtToken(user)

    return token
  }

  private createJwtToken({ email }: any) {
    const accessToken = this.jwtService.sign({ email })

    return {
      accessToken,
      expiresIn: this.config.get('jwt.expires_in'),
    }
  }
}
