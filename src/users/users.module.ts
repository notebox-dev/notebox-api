import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EncryptionModule } from 'src/lib/encryption'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), EncryptionModule],
  exports: [UsersService],
})
export class UsersModule {}
