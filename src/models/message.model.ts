export interface Sender {
	id: string;
	name?: string;
	imageUrl?: string;
}

export class Message {
	content: string;
	createdAt: Date;
	id: string;
	roomId: string;
	sender: Sender;
	seen: Array<string>;
}
