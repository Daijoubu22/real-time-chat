import { useEffect, useState } from 'react';
import Message from 'services/models/Message';
import axios from 'axios';
import { BASE_URL } from 'services/constants/constants';
import NewMessage from 'services/models/NewMessage';

const useEventSourcing = (): [Message[], (message: NewMessage) => void] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    subscribe();
  }, [])

  const sendMessage = async (message: NewMessage) => {
    await axios.post(`${BASE_URL}/new-message`, message)
  }

  const subscribe = async () => {
    const eventSource = new EventSource(`${BASE_URL}/connect`);
    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    }
  }

  return [messages, sendMessage];
}

export default useEventSourcing;
