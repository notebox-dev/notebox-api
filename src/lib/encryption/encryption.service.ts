import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hashSync, compareSync } from 'bcrypt'

import { Encryption } from './encryption.interface'

@Injectable()
export class EncryptionService implements Encryption {
  constructor(private config: ConfigService) {}

  hashSync(plain: string): string {
    return hashSync(plain, this.config.get('encryption.salt_rounds'))
  }

  compareSync(plain: string, encrypted: string): boolean {
    return compareSync(plain, encrypted)
  }
}
