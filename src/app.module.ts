import { Module } from '@nestjs/common'
import { AuthModule } from './features/auth/AuthModule'
import { NotesModule } from './notes/notes.module'

@Module({
  imports: [AuthModule, NotesModule],
})
export class AppModule {}
