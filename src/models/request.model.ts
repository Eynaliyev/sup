import { Sender } from "./models";

export class Request {
	createdAt: Date;
	seen: Array<string>;
	sender: Sender;
}
