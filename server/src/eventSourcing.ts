import express from 'express';
import cors from 'cors';
import events from 'events';
import { PORT } from 'utils';

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/connect', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  })
  emitter.on('newMessage', (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`);
  })
});

app.post('/new-message', (req, res) => {
  const message = req.body;
  message.id = Date.now();
  emitter.emit('newMessage', message);
  res.status(200).send();
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
