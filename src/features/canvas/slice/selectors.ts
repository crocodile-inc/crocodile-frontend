import { RootState } from '~/store';

export const selectloading = (state: RootState) => state.canvas.loading;
export const selectStrokeWidth = (state: RootState) => state.canvas.local.strokeWidth;
export const selectStrokeColor = (state: RootState) => state.canvas.local.strokeColor;
export const selectBackgroundColor = (state: RootState) => {
  if (state.canvas.remote) return state.canvas.remote.backgroundColor;
  return state.canvas.local.backgroundColor;
};
export const selectCurrentRoomId = (state: RootState) => state.canvas.currentRoomId;
export const selectRemote = (state: RootState) => state.canvas.remote;
export const selectGuesses = (state: RootState) => state.canvas.guesses;
export const selectIsGameFinished = (state: RootState) => state.canvas.isGameFinished;
