import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenEntity } from 'src/auth'
import { TasksService } from './tasks.service'

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokenEntity])],
  providers: [TasksService],
})
export class TasksModule {}
