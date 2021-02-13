import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

import { PostgresModule } from 'src/lib/postgres'
import { NotesModule } from 'src/notes/notes.module'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { configure } from 'src/configs'
import { HttpExceptionFilter } from 'src/lib/http-exception.filter'

@Module({
  imports: [
    // TODO: Use custom config service for getting env variables.
    ConfigModule.forRoot({
      load: [configure],
      envFilePath: ['.development.env'],
    }),
    PostgresModule,
    NotesModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
