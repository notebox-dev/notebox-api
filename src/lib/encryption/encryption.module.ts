import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EncryptionService } from './encryption.service'

export const EncryptionToken = Symbol('$$encryption')

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EncryptionToken,
      useClass: EncryptionService,
    },
  ],
  exports: [EncryptionToken],
})
export class EncryptionModule {}
