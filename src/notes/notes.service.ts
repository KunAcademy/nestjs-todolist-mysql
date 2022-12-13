// This file will be responsible for providing methods that retriveing or storing data in MySQL
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { NoteResInterface } from './note.interface';
@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {}
  async getNotes(): Promise<NoteResInterface> {
    const data = await this.notesRepository.find();
    if (data) {
      return {
        status: 200,
        length: data.length,
        data: data,
      };
    } else {
      return {
        status: 400,
        message: 'Faild to get list',
      };
    }
  }

  findOne(id: number): Promise<Note> {
    return this.notesRepository.findOneBy({ id: id });
  }

  async createNote(note: Note): Promise<NoteResInterface> {
    console.log('note:', note);
    this.notesRepository.save(note);
    return {
      status: 200,
      message: 'Create note successful',
    };
  }

  async remove(id: string): Promise<NoteResInterface> {
    await this.notesRepository.delete(id);
    return {
      status: 200,
      message: 'Delete note successful',
    };
  }

  async editNote(id: number, note: Note): Promise<Note> {
    const editedNote = await this.notesRepository.findOneBy({ id: id });
    if (!editedNote) {
      throw new NotFoundException('Note is not found');
    }
    editedNote.description = note.description;
    editedNote.title = note.title;
    await editedNote.save();
    return editedNote;
  }
}
