import { Message } from "./models";

export interface Contact {
	id: string;
	createdAt: string;
	imgUrl: string;
	firstName: string;
	lastName: string;
	lastMessage?: Message;
}
