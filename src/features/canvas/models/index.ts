export interface Room {
  id: string;
  riddle: string;
  picture: Picture;
  guesses: Guess[];
  unraveled: boolean;
}

export interface Guess {
  id: number;
  author: string;
  guess: string;
  victorious?: boolean;
}

export interface Picture {
  id: number;
  strokes: Stroke[];
  backgroundColor: string;
}

export interface Stroke {
  strokeColor: string;
  strokeWidth: number;
  points: Point[];
}

export interface Point {
  x: number;
  y: number;
}
