import { config } from '~/config';
import {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
  socketRef: MutableRefObject<Socket | undefined>;
}

export const SocketContext = createContext<SocketContextValue>({} as SocketContextValue);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(config.serverUrl);

    const socket = socketRef.current;

    return () => {
      socket.close();
    };
  }, []);

  const value: SocketContextValue = {
    socketRef,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);
