import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'
import { addMillisecondsFromNow } from 'src/lib/date'
import { RefreshSession } from './entities/refresh-session.entity'

type RequestMeta = { ip: string; userAgent: string }

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private config: ConfigService,
    @InjectRepository(RefreshSession) private refreshSessionRepository: Repository<RefreshSession>,
  ) {}

  async createSession({ email }: any, meta: RequestMeta) {
    const user = await this.userService.findByEmail(email)
    const accessToken = await this.generateAccessToken(user)
    const refreshToken = await this.generateRefreshToken(user, meta)

    return { ...accessToken, ...refreshToken }
  }

  private async generateAccessToken({ email }: any) {
    const accessToken = await this.jwtService.signAsync({ email })

    return {
      accessToken,
      expiresIn: addMillisecondsFromNow(this.config.get('access_token.expires_in')),
    }
  }

  private async generateRefreshToken(user: User, meta: RequestMeta) {
    const entity = new RefreshSession()
    entity.userId = user.id
    entity.expiresIn = addMillisecondsFromNow(this.config.get('refresh_token.expires_in'))
    entity.ip = meta.ip
    entity.userAgent = meta.userAgent

    const refreshSession = await this.refreshSessionRepository.save(entity)

    return {
      refreshToken: refreshSession.id,
    }
  }
}
