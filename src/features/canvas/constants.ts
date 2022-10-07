export const events = {
  toServer: {
    START_NEW_GAME: 'START_NEW_GAME',
    JOIN_THE_GAME: 'JOIN_THE_GAME',
    STROKE_TO_SERVER: 'STROKE_TO_SERVER',
    BACKGROUND_COLOR_TO_SERVER: 'BACKGROUND_COLOR_TO_SERVER',
    CLEAR_TO_SERVER: 'CLEAR_TO_SERVER',
    GUESS_TO_SERVER: 'GUESS_TO_SERVER',
  },
  fromServer: {
    ROOM_ID_FROM_SERVER: 'ROOM_ID_FROM_SERVER',
    ROOM_DATA_FROM_SERVER: 'ROOM_DATA_FROM_SERVER',
    STROKE_FROM_SERVER: 'STROKE_FROM_SERVER',
    BACKGROUND_COLOR_FROM_SERVER: 'BACKGROUND_COLOR_FROM_SERVER',
    GUESS_FROM_SERVER: 'GUESS_FROM_SERVER',
    ANSWER_FROM_SERVER: 'ANSWER_FROM_SERVER',
  },
};

export const canvasSizes = {
  width: 650,
  height: 650,
};

export const initialStrokeWidth = 6;

export const initialStrokeColor = '#000000';

export const initialBackgroundColor = '#FFFFFF';

export const chatCoolDown = 3;
