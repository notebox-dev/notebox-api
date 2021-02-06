import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      ignoreExpiration: false,
      // TODO: Use cookie extractor for web.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secret_key'),
    })
  }

  /**
   * A method calls after JWT is verified,
   * and result will be attached for request.
   */
  async validate(payload: any) {
    // FIXME: Define type for jwt payload.
    return { email: payload.email }
  }
}
