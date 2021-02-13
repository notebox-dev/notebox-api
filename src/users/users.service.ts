import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EncryptionService } from 'src/lib/encryption/encryption.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private encryption: EncryptionService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const isUserExists = await this.userRepo.count({ email: userDto.email })

    if (isUserExists) {
      throw new BadRequestException('User with this email already exists')
    }

    return this.userRepo.save({
      ...userDto,
      password: await this.encryption.hash(userDto.password),
    })
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ email })

    if (!user) {
      throw new BadRequestException('Incorrect email or password')
    }

    return user
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id)

    if (!user) {
      throw new BadRequestException('Incorrect email or password')
    }

    return user
  }

  async checkPassword(rawPassword: string, encryptedPassword: string): Promise<boolean> {
    // TODO: Maybe remove from this service?
    const isValid = await this.encryption.compare(rawPassword, encryptedPassword)

    if (!isValid) {
      throw new BadRequestException('Incorrect email or password')
    }

    return true
  }
}
