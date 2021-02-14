import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { PostgresModule } from 'src/lib/postgres'
import { NotesModule } from 'src/notes/notes.module'
import { AuthModule } from 'src/auth'
import { UsersModule } from 'src/users/users.module'
import { configure } from 'src/configs'
import { HttpExceptionFilter } from 'src/lib/http-exception.filter'
import { TasksModule } from 'src/tasks'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // TODO: Use custom config service for getting env variables.
    ConfigModule.forRoot({
      load: [configure],
      envFilePath: ['.development.env'],
    }),
    PostgresModule,
    NotesModule,
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
