import NewMessage from 'services/models/NewMessage';

export default interface Message extends NewMessage {
  id: number;
}