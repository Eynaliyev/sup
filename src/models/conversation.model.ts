
import { Message } from "./models";

export class Conversation {
	constructor(
		public conversationId: string,
		public messages: Message[] //based on Message Model
	) {}
}