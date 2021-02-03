import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostgresModule } from './lib/postgres'
import { NotesModule } from './notes/notes.module'
import { configure } from './configs'

@Module({
  imports: [
    // TODO: Use custom config service for getting env variables.
    ConfigModule.forRoot({
      load: [configure],
      envFilePath: ['.development.env'],
    }),
    PostgresModule,
    NotesModule,
  ],
})
export class AppModule {}
