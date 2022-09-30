import { Picture } from './Picture';
import { Guess } from './Guess';

export interface Room {
  id: string;
  riddle: string;
  picture: Picture;
  guesses: Guess[];
  unraveled: boolean;
}
