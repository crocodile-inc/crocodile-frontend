import { Stroke } from './Stroke';

export interface Picture {
  id: number;
  strokes: Stroke[];
  backgroundColor: string;
}
