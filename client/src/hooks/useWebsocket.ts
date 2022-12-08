import { useEffect, useRef, useState } from 'react';
import Message from 'services/models/Message';
import { WS_URL } from 'services/constants/constants';
import NewMessage from 'services/models/NewMessage';

const useWebsocket = (): [Message[], (message: NewMessage) => void] => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useRef<WebSocket | undefined>();

  useEffect(() => {
    socket.current = new WebSocket(WS_URL);
    socket.current.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    }
    socket.current.onclose = () => {
      console.log('Socket has closed');
    }
    socket.current.onerror = () => {
      console.log('Websocket error');
    }
  }, [])

  const sendMessage = async (message: NewMessage) => {
    socket.current?.send(JSON.stringify({
      ...message,
      event: 'message',
    }));
  }

  return [messages, sendMessage];
}

export default useWebsocket;
