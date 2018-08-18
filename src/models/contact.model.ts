import { Message } from "./models";

export interface Contact {
	id: string;
	createdAt: Date;
	imgUrl: string;
	lastMessage: Message;
}
