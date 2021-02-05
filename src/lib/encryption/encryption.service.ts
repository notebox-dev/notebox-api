import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash, compare } from 'bcrypt'

@Injectable()
export class EncryptionService {
  constructor(private config: ConfigService) {}

  hash(plain: string): Promise<string> {
    return hash(plain, this.config.get('encryption.salt_rounds'))
  }

  compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted)
  }
}
