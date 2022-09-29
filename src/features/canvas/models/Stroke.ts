import { Point } from './Point';

export interface Stroke {
  strokeColor: string;
  strokeWidth: number;
  points: Point[];
}
