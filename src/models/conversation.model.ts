
import { Message } from "./models";

export class Conversation {
	constructor(
		public conversationId: string,
		public messages: any[] //based on Message Model
	) {}
}