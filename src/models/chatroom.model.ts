import { Message } from "./models";
import { Language } from "./models";

export interface Participant {
	id: string;
	name: string;
	votes: number;
	profileImgUrl: string;
}

export class Chatroom {
	constructor(
		public id: string,
		public femaleParticipants: Participant[],
		public maleParticipants: Participant[],
		public messages: Message[],
		public language?: Language,
		public blocked?: Participant[],
		public warnings?: Participant[],
		public privateConversation?: boolean
	) {}
}
