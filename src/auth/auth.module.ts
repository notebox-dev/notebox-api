import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'src/users/users.module'
import { EncryptionModule } from 'src/lib/encryption'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshTokenEntity } from './entities/refresh-token.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => ({
        secret: config.get('access_token.secret_key'),
        signOptions: {
          expiresIn: config.get('access_token.expires_in'),
        },
      }),
    }),
    UsersModule,
    EncryptionModule,
  ],
  providers: [ConfigService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
