import { useEffect, useState } from 'react';
import Message from 'services/models/Message';
import axios from 'axios';
import { BASE_URL } from 'services/constants/constants';
import NewMessage from 'services/models/NewMessage';

const useLongPolling = (): [Message[], (message: NewMessage) => void] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    subscribe();
  }, [])

  const sendMessage = async (message: NewMessage) => {
    await axios.post(`${BASE_URL}/new-message`, message)
  }

  const subscribe = async () => {
    try {
      const { data } = await axios.get<Message>(`${BASE_URL}/messages`);
      setMessages(prev => [...prev, data]);
      subscribe();
    } catch {
      subscribe();
    }
  }

  return [messages, sendMessage];
}

export default useLongPolling;
