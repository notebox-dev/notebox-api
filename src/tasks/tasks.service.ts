import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThanOrEqual, Repository } from 'typeorm'

import { RefreshToken } from 'src/auth'

@Injectable()
export class TasksService {
  constructor(@InjectRepository(RefreshToken) private refreshTokenRepo: Repository<RefreshToken>) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  deleteExpiredRefreshTokens() {
    this.refreshTokenRepo.delete({ expiresIn: LessThanOrEqual(Date.now()) })
  }
}
