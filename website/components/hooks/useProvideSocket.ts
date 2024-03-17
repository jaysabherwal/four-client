import useWebSocket from 'react-use-websocket';
import { Message } from '../models/message';

const useProvideSocket = (socketUrl: string | null) => {
  return useWebSocket<Message>(socketUrl);
};

export default useProvideSocket;