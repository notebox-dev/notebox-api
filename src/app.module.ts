import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PostgresModule } from 'src/lib/postgres'
import { NotesModule } from 'src/notes/notes.module'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { configure } from 'src/configs'

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
})
export class AppModule {}
