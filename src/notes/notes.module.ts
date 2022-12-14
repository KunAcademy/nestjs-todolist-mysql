import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './note.schema';
import { NoteCtroller } from './notes.controller';
import { NoteService } from './notes.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  controllers: [NoteCtroller],
  providers: [NoteService],
})
export class NoteModule {}
