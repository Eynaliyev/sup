import{ Sender } from './models';

export class Message {
	content: string;
	createdAt: Date;
	id: string;
	roomId: string;
	sender: Sender;
	seen: Array<string>;
}
