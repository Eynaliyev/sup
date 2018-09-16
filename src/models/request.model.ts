import { Sender, Recepient } from "./models";

export class Request {
	createdAt: string;
	seen: Array<string>;
	sender: Sender;
	recepient: Recepient; 
}
