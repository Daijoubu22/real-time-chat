import express from 'express';
import cors from 'cors';
import events from 'events';

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  })
});

app.post('/new-message', (req, res) => {
  const message = req.body;
  message.id = Date.now();
  emitter.emit('newMessage', message);
  res.status(200).send();
});

export default app;
