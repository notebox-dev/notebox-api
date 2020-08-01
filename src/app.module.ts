import { Module } from '@nestjs/common'
import { AuthModule } from './features/auth/AuthModule'

@Module({
  imports: [AuthModule],
})
export class AppModule {}
