import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EncryptionService } from 'src/lib/encryption/encryption.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private encryptionService: EncryptionService,
  ) {}

  async create(user: CreateUserDto) {
    // TODO: Handle unique error.
    user.password = await this.encryptionService.hash(user.password)
    return this.repository.save(user)
  }
}
