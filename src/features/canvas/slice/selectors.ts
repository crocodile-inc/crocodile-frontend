import { RootState } from '~/store';

export const selectCurrentRoomId = (state: RootState) => state.canvas.currentRoomId;
export const selectPicture = (state: RootState) => state.canvas.picture;
export const selectGuesses = (state: RootState) => state.canvas.guesses;
export const selectIsGameFinished = (state: RootState) => state.canvas.isGameFinished;
