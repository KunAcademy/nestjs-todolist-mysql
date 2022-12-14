import { Document } from 'mongoose';
export interface Note {
  id: number;
  title: string;
  description: string;
}
export interface NoteResInterface {
  data?: Note[];
  status: number;
  message?: string;
  length?: number;
}

export interface NoteMongoInterface extends Document {
  readonly name: string;
  readonly description: string;
  readonly tags: string;
  readonly createdAt: string;
}
