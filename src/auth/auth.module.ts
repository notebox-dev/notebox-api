import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'src/users/users.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshSession } from './entities/refresh-session.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshSession]),
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
  ],
  providers: [ConfigService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
