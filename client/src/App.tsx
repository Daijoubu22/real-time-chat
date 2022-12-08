import React from 'react';
import Chat from 'components/Chat';
import useLongPolling from 'hooks/useLongPolling';
import useEventSourcing from 'hooks/useEventSourcing';
import useWebsocket from 'hooks/useWebsocket';

function App() {
  // const [messages, sendMessage] = useLongPolling();
  // const [messages, sendMessage] = useEventSourcing();
  const [messages, sendMessage] = useWebsocket();

  return (
    <div className="h-screen">
      <Chat messages={messages} sendMessage={sendMessage} />
    </div>
  );
}

export default App;
