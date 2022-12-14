import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './notes/notes.module';
import 'dotenv/config';
@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
