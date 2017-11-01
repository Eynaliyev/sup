import {Message} from './models';
import {Language} from './models';

interface Participant {
    id: string;
    name: string;
    votes: number;
    profileImgUrl: string;
}

export class Chatroom {
  constructor(
    public femaleParticipants: Participant[],
		public maleParticipants: Participant[],
		public language: Language,
    public messages: Message[],
    public blocked?: Participant[],
    public warnings?: Participant[],
  ) {  }
}
