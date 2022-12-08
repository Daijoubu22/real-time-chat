import React, { useState } from 'react';
import Message from 'services/models/Message';
import NewMessage from 'services/models/NewMessage';

interface ChatProps {
  messages: Message[];
  sendMessage: (message: NewMessage) => void;
  className?: string;
}

function Chat({ messages, sendMessage }: ChatProps) {
  const [newMessageText, setNewMessageText] = useState('');

  const handleSendBtn = () => {
    sendMessage({
      text: newMessageText,
      date: Date.now(),
    });
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
        onClick={handleSendBtn}
      >
        Send message
      </button>
      {messages.map(item => <p key={item.id}>{item.text}</p>)}
    </div>
  );
}

Chat.defaultProps = {
  className: undefined,
};

export default Chat;
