import { Module } from '@nestjs/common'
import { AuthController } from './AuthController'

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
