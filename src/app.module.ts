import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './features/auth/AuthModule'
import { NotesModule } from './notes/notes.module'
import { configure } from './configs'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configure],
      envFilePath: ['.development.env'],
    }),
    AuthModule,
    NotesModule,
  ],
})
export class AppModule {}
