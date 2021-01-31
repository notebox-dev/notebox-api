import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './features/auth/AuthModule'
import { NotesModule } from './notes/notes.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    AuthModule,
    NotesModule,
  ],
})
export class AppModule {}
