import { Sender, Recipient } from "./models";

export class Request {
	createdAt: string;
	seen: Array<string>;
	sender: Sender;
	recipient: Recipient;
}
