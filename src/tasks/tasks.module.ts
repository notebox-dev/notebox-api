import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshToken } from 'src/auth'
import { TasksService } from './tasks.service'

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  providers: [TasksService],
})
export class TasksModule {}
