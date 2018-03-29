export class Request {
	id: string;
	date: Date;
	seen: Array<string>;
	senderId: string;
	senderName: string;
	senderImage: string;
	toUserId: string;
	content?: string;
}