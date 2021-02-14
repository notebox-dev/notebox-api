import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThanOrEqual, Repository } from 'typeorm'

import { RefreshTokenEntity } from 'src/auth'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(RefreshTokenEntity) private refreshTokenRepo: Repository<RefreshTokenEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  deleteExpiredRefreshTokens() {
    this.refreshTokenRepo.delete({ expiresIn: LessThanOrEqual(Date.now()) })
  }
}
