import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Encryption, EncryptionToken } from 'src/lib/encryption'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(EncryptionToken) private encryption: Encryption,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const isUserExists = await this.userRepo.count({ email: userDto.email })

    if (isUserExists) {
      throw new BadRequestException('User with this email already exists')
    }

    userDto.password = this.encryption.hashSync(userDto.password)
    const user = await this.userRepo.save(userDto)

    return user
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email })
  }

  findOneById(id: string): Promise<User> {
    return this.userRepo.findOne({ id })
  }
}
