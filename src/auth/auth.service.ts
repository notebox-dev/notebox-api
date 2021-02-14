import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'
import { Encryption, EncryptionToken } from 'src/lib/encryption'
import { addMillisecondsFromNow } from 'src/lib/date'
import { RefreshTokenEntity } from './entities/refresh-token.entity'
import { Meta } from './lib/meta.decorator'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'

@Injectable()
export class AuthService {
  static MAX_REFRESH_SESSIONS = 5

  constructor(
    private jwt: JwtService,
    private user: UsersService,
    private config: ConfigService,
    @InjectRepository(RefreshTokenEntity) private refreshTokenRepo: Repository<RefreshTokenEntity>,
    @Inject(EncryptionToken) private encryption: Encryption,
  ) {}

  async createSession({ email, password }: LoginDto, meta: Meta) {
    const user = await this.user.findOneByEmail(email)

    if (!this.encryption.compareSync(password, user.password)) {
      throw new UnauthorizedException('Incorrect email or password')
    }

    // TODO: Remove old refresh token with this meta.
    const tokens = await this.generateTokens(user, meta)

    return tokens
  }

  destroySession({ refreshToken }: RefreshDto): void {
    this.refreshTokenRepo.delete(refreshToken)
  }

  // TODO: Impl this.
  destroyAllSessions(): void {}

  async refreshSession({ refreshToken }: RefreshDto, meta: Meta) {
    const oldRefreshToken = await this.refreshTokenRepo.findOne(refreshToken)

    if (!oldRefreshToken) {
      throw new BadRequestException('invalid token')
    }

    await this.refreshTokenRepo.remove(oldRefreshToken)

    if (!this.isTokenMetaValid(oldRefreshToken, meta)) {
      throw new BadRequestException('invalid token')
    }

    const user = await this.user.findOneById(oldRefreshToken.userId)

    if (!user) {
      throw new BadRequestException('idk')
    }

    const tokens = await this.generateTokens(user, meta)

    return tokens
  }

  private isTokenMetaValid(token: RefreshTokenEntity, nextMeta: Meta) {
    return (
      // token.ip === nextMeta.ip &&
      token.userAgent === nextMeta.userAgent && token.expiresIn > Date.now()
    )
  }

  private async generateTokens(user: User, meta: Meta) {
    const accessToken = await this.generateAccessToken(user)
    const refreshToken = await this.generateRefreshToken(user, meta)

    return { ...accessToken, ...refreshToken }
  }

  private async generateAccessToken({ id }: User) {
    const accessToken = await this.jwt.signAsync({ id })

    return {
      accessToken,
      expiresIn: addMillisecondsFromNow(this.config.get('access_token.expires_in')),
    }
  }

  private async generateRefreshToken(user: User, meta: Meta) {
    const userTokens = await this.refreshTokenRepo.count({ userId: user.id })

    if (userTokens >= AuthService.MAX_REFRESH_SESSIONS) {
      await this.refreshTokenRepo.delete({ userId: user.id })
    }

    const token = new RefreshTokenEntity()
    token.userId = user.id
    token.expiresIn = addMillisecondsFromNow(this.config.get('refresh_token.expires_in'))
    token.ip = meta.ip
    token.userAgent = meta.userAgent

    const refreshSession = await this.refreshTokenRepo.save(token)

    return {
      refreshToken: refreshSession.id,
    }
  }
}
