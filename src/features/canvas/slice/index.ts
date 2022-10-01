import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Picture } from '~/features/canvas/models/Picture';
import { Room } from '~/features/canvas/models/Room';
import { Stroke } from '~/features/canvas/models/Stroke';
import { Guess } from '~/features/canvas/models/Guess';

interface CanvasState {
  currentRoomId: Room['id'] | undefined | null;
  picture: Picture | undefined;
  guesses: Guess[];
  isGameFinished: boolean;
  initialValues: {
    strokeWidth: number;
    strokeColor: string;
    backgroundColor: string;
  };
  strokes: Stroke[];
}

const initialState: CanvasState = {
  currentRoomId: undefined,
  picture: undefined,
  guesses: [],
  isGameFinished: false,
  initialValues: {
    strokeWidth: 6,
    strokeColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  strokes: [],
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    initializeRoomData(state, { payload }: PayloadAction<{ picture: Picture; guesses?: Guess[] }>) {
      state.picture = payload.picture;
      if (payload.guesses) {
        state.guesses = payload.guesses;
        state.isGameFinished = payload.guesses.some(guess => guess.victorious);
      }
    },
    addStroke(state, { payload }: PayloadAction<Stroke>) {
      state.strokes.push(payload);
    },
    clear(state) {
      state.strokes = initialState.strokes;
    },
    setCurrentRoomId(state, { payload }: PayloadAction<CanvasState['currentRoomId']>) {
      state.currentRoomId = payload;
    },
    setBackgroundColor(state, { payload }: PayloadAction<Picture['backgroundColor']>) {
      if (state.picture) {
        state.picture.backgroundColor = payload;
      }
    },
    addGuess(state, { payload }: PayloadAction<Guess>) {
      state.guesses.push(payload);
      state.isGameFinished = !!payload.victorious;
    },
  },
});

export const {
  initializeRoomData,
  addStroke,
  clear,
  setCurrentRoomId,
  setBackgroundColor,
  addGuess,
} = canvasSlice.actions;

export default canvasSlice.reducer;
