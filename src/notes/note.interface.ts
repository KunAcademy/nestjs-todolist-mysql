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
