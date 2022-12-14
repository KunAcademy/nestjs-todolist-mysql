import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { CreateNoteDTO } from './note.dto';

@Controller('note')
export class NoteCtroller {
  constructor(private noteService: NoteService) {}

  @Post('/add')
  async createANote(@Res() res, @Body() createNoteDTO: CreateNoteDTO) {
    const note = await this.noteService.createANote(createNoteDTO);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'Successful!',
      data: note,
    });
  }

  @Get('/all')
  async getAllNotes(@Res() res) {
    const notes = await this.noteService.getAllNotes();
    return res.status(HttpStatus.OK).json({
      status: 200,
      data: notes,
    });
  }

  @Get('/:noteId')
  async getANote(@Res() res, @Param('noteId') _id: string) {
    const note = await this.noteService.getANote(_id);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .join({ status: 404, error: 'Note found!' });
    return res.status(HttpStatus.OK).join({ status: 200, data: note });
  }

  @Patch('/update/:noteId')
  async updateCustomer(
    @Res() res,
    @Body() createNoteDTO: CreateNoteDTO,
    @Param('noteId') _id: string,
  ) {
    const note = await this.noteService.updateANote(_id, createNoteDTO);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .join({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successfull',
      note,
    });
  }

  @Delete('/delete/:noteId')
  async deleteCustomer(@Res() res, @Param('noteId') _id) {
    const note = await this.noteService.deleteANote(_id);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successful',
    });
  }
}
