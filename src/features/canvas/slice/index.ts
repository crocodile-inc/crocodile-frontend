import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  initialBackgroundColor,
  initialStrokeColor,
  initialStrokeWidth,
} from '~/features/canvas/constants';
import { Guess, Picture, Room, Stroke } from '~/features/canvas/models';

interface CanvasState {
  loading: boolean;
  currentRoomId: Room['id'] | undefined | null;
  isGameFinished: boolean;
  guesses: Guess[];
  local: {
    strokeWidth: number;
    strokeColor: string;
    backgroundColor: string;
    strokes: Stroke[];
  };
  remote: {
    backgroundColor: string;
    strokes: Stroke[];
  } | null;
}

const initialState: CanvasState = {
  loading: false,
  currentRoomId: undefined,
  isGameFinished: false,
  guesses: [],
  local: {
    strokeWidth: initialStrokeWidth,
    strokeColor: initialStrokeColor,
    backgroundColor: initialBackgroundColor,
    strokes: [],
  },
  remote: null,
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<CanvasState['loading']>) {
      state.loading = payload;
    },
    setStrokeWidth(state, { payload }: PayloadAction<Stroke['strokeWidth']>) {
      state.local.strokeWidth = payload;
    },
    setStrokeColor(state, { payload }: PayloadAction<Stroke['strokeColor']>) {
      state.local.strokeColor = payload;
    },
    setBackgroundColor(state, { payload }: PayloadAction<Picture['backgroundColor']>) {
      state.local.backgroundColor = payload;
      if (state.remote) {
        state.remote.backgroundColor = payload;
      }
    },
    initializeRoom(state, { payload }: PayloadAction<{ picture: Picture; guesses?: Guess[] }>) {
      state.remote = {
        backgroundColor: payload.picture.backgroundColor,
        strokes: payload.picture.strokes,
      };
      if (payload.guesses) {
        state.guesses = payload.guesses;
        state.isGameFinished = payload.guesses.some(guess => guess.victorious);
      }
    },
    setCurrentRoomId(state, { payload }: PayloadAction<CanvasState['currentRoomId']>) {
      state.currentRoomId = payload;
    },
    addStroke(state, { payload }: PayloadAction<Stroke>) {
      state.local.strokes.push(payload);
    },
    addGuess(state, { payload }: PayloadAction<Guess>) {
      state.guesses.push(payload);
      if (payload.victorious) {
        state.isGameFinished = true;
      }
    },
    clear() {
      return initialState;
    },
  },
});

export const {
  setLoading,
  setStrokeWidth,
  setStrokeColor,
  setBackgroundColor,
  initializeRoom,
  addStroke,
  setCurrentRoomId,
  addGuess,
  clear,
} = canvasSlice.actions;

export default canvasSlice.reducer;
