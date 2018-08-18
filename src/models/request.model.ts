enum RequestType {
	RequestSent = "RequestSent",
	RequestReceived = "RequestReceived",
	BlockSent = "BlockSent",
	BlockedReceived = "BlockedReceived",
	Rejected = "Rejected"
}

export class Request {
	id: string;
	date: Date;
	seen: Array<string>;
	senderId: string;
	toUserId: string;
	requestType?: RequestType;
}
