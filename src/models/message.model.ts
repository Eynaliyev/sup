import{ Sender } from './models';

export class Message {
	content: string;
	createdAt: string;
	id: string;
	roomId: string;
	sender: Sender;
	seen: Array<string>;
}
