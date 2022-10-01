import { events } from '~/features/canvas/constants';
import { Picture } from '~/features/canvas/models/Picture';
import { Room } from '~/features/canvas/models/Room';
import { Stroke } from '~/features/canvas/models/Stroke';
import { addStroke, initializeRoomData, setCurrentRoomId } from '~/features/canvas/slice';
import { selectCurrentRoomId, selectInitialValues } from '~/features/canvas/slice/selectors';
import { reverse } from 'named-urls';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { useSocketContext } from '~/shared/providers/socketProvider';
import { Guess } from '~/features/canvas/models/Guess';

export const useSocketActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { socketRef } = useSocketContext();

  const initialValues = useAppSelector(selectInitialValues);
  const currentRoomId = useAppSelector(selectCurrentRoomId);

  const handleRoomIdFromServer = (roomId: Room['id']) => {
    dispatch(setCurrentRoomId(roomId));
    socketRef.current?.off(events.fromServer.ROOM_ID_FROM_SERVER, handleRoomIdFromServer);
    navigate(reverse(routes.rooms.room, { roomId }), { state: { author: true } });
  };

  const startNewGame = (riddle: Room['riddle']) => {
    const backgroundColor = initialValues.backgroundColor;
    dispatch(setCurrentRoomId(null));
    socketRef.current?.on(events.fromServer.ROOM_ID_FROM_SERVER, handleRoomIdFromServer);
    socketRef.current?.emit(events.toServer.START_NEW_GAME, { riddle, backgroundColor });
  };

  const handleRoomDataFromServer = (
    roomData: { picture: Picture; guesses?: Guess[] } | undefined,
  ) => {
    if (roomData) {
      dispatch(initializeRoomData(roomData));
    }
  };

  const joinTheGame = (roomId: Room['id']) => {
    dispatch(setCurrentRoomId(roomId));
    socketRef.current?.on(events.fromServer.ROOM_DATA_FROM_SERVER, handleRoomDataFromServer);
    socketRef.current?.emit(events.toServer.JOIN_THE_GAME, roomId);
  };

  const sendStrokeToServer = (stroke: Stroke) => {
    dispatch(addStroke(stroke));
    socketRef.current?.emit(events.toServer.STROKE_TO_SERVER, { roomId: currentRoomId, stroke });
  };

  const subscribeToStrokes = (callback: (stroke: Stroke) => void) => {
    socketRef.current?.on(events.fromServer.STROKE_FROM_SERVER, callback);
    return () => {
      socketRef.current?.off(events.fromServer.STROKE_FROM_SERVER, callback);
    };
  };

  const sendBackgroundColorToServer = (backgroundColor: Picture['backgroundColor']) => {
    socketRef.current?.emit(events.toServer.BACKGROUND_COLOR_TO_SERVER, {
      roomId: currentRoomId,
      backgroundColor,
    });
  };

  const subscribeToBackgroundColor = (
    callback: (backgroundColor: Picture['backgroundColor']) => void,
  ) => {
    socketRef.current?.on(events.fromServer.BACKGROUND_COLOR_FROM_SERVER, callback);
    return () => {
      socketRef.current?.off(events.fromServer.BACKGROUND_COLOR_FROM_SERVER, callback);
    };
  };

  const clearPictureInRoom = () => {
    socketRef.current?.emit(events.toServer.CLEAR_TO_SERVER, currentRoomId);
  };

  const sendGuessToServer = (guess: Guess['guess'], author: Guess['author']) => {
    socketRef.current?.emit(events.toServer.GUESS_TO_SERVER, {
      roomId: currentRoomId,
      author,
      guess,
    });
  };

  const subscribeToGuesses = (callback: (guess: Guess) => void) => {
    socketRef.current?.on(events.fromServer.GUESS_FROM_SERVER, callback);
    return () => {
      socketRef.current?.off(events.fromServer.GUESS_FROM_SERVER, callback);
    };
  };

  return [
    socketRef.current,
    {
      currentRoomId,
      startNewGame,
      joinTheGame,
      sendStrokeToServer,
      subscribeToStrokes,
      sendBackgroundColorToServer,
      subscribeToBackgroundColor,
      clearPictureInRoom,
      sendGuessToServer,
      subscribeToGuesses,
    },
  ] as const;
};
