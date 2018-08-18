enum RequestType {
	RequestSent = "RequestSent",
	RequestReceived = "RequestReceived",
	BlockSent = "BlockSent",
	BlockedReceived = "BlockedReceived",
	Rejected = "Rejected"
}

export class Request {
	id: string;
	createdAt: Date;
	seen: Array<string>;
	senderId: string;
	toUserId: string;
	requestType?: RequestType;
	imgUrl: string;
	name: string;
}
