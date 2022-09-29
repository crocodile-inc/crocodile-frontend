import { include } from 'named-urls';

export const routes = {
  home: '/',
  rooms: include('rooms', {
    room: ':roomId',
  }),
};
