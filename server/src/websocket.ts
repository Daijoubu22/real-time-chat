import ws from 'ws';
import { PORT } from '../src/utils';

interface WSMessage {
  event: 'message' | 'connection',
  id: number,
  date: number,
  text: string,
}

const wss = new ws.Server({
  port: PORT,
}, () => console.log(`Server started on port ${PORT}`));

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const message: WSMessage = JSON.parse(data.toString());
    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;
      case 'connection':
        broadcastMessage(message);
        break;
    }
  })
})

const broadcastMessage = (message: WSMessage) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  })
}
