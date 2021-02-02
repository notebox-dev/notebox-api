import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Note } from './entities/note.entity'

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private repository: Repository<Note>) {}

  create(note: CreateNoteDto) {
    return this.repository.create(note)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} note`
  }

  update(id: number, _updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`
  }

  remove(id: number) {
    return `This action removes a #${id} note`
  }
}
