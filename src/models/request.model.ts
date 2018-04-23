export class Request {
	id: string;
	date: Date;
	seen: Array<string>;
	senderId: string;
	toUserId: string;
	content?: string;
}
