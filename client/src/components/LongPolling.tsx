import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'services/constants/constants';
import Message from 'services/models/Message';

function LongPolling() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  useEffect(() => {
    subscribe();
  }, [])

  const sendMessage = async () => {
    await axios.post(`${BASE_URL}/new-message`, {
      text: newMessageText,
      date: Date.now(),
    })
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

  return (
    <div className="container mx-auto">
      <input
        className="border rounded-lg px-3 py-1"
        type="text"
        value={newMessageText}
        onChange={(e) => setNewMessageText(e.target.value)}
      />
      <button
        className="border rounded-lg px-3 py-1"
        onClick={sendMessage}
      >
        Send message
      </button>
      {messages.map(item => <p key={item.id}>{item.text}</p>)}
    </div>
  )
}

export default LongPolling;
