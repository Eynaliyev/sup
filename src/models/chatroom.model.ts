import {Message} from './message.model';

interface Participant {
    id: number;
    name: string;
    blocked: boolean;
    profileImgUrl: string;
    private: boolean;
}

export class Chatroom {
  constructor(
    public id: number,
    public participants: Participant[],
    public meassages: Message[],
    public imgUrl?: string,
    public coverImgUrl?: string,
    public blocked?: Participant[],
    public warnings?: Participant[],
  ) {  }
}
