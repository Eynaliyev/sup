import { Message } from "./models";
import { Language } from "./models";

export interface Participant {
	id: string;
	firstName: string;
	lastName: string;
	imgUrl: string;
	votes?: number;
}

export class Chatroom {
	constructor(
		public id: string,
		public participants: Participant[],
		public messages: Message[],
		public language?: Language,
		public blocked?: Participant[],
		public warnings?: Participant[]
	) {}
}
