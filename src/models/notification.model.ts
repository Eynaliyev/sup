export class Notification {
	content: string;
	createdAt: string;
	id: string;
	senderId: string;
	seen: Array<string>;
	roomId?: string;
	senderName?: string;
	senderImage?: string;
}
