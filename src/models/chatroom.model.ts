import {Message} from './message.model';

interface Participant {
    id: string;
    name: string;
    votes: number;
    profileImgUrl: string;
}

export class Chatroom {
  constructor(
    public id: string,
    public participants: Participant[],
    public messages: Message[],
    public blocked?: Participant[],
    public warnings?: Participant[],
  ) {  }
}
