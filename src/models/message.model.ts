export interface Sender {
	id: string;
	name: string;
	imageUrl: string;
}

export class Message {
	content: string;
	date: Date;
	id: string;
	roomId: string;
	sender: Sender;
	seen: Array<string>;
}
