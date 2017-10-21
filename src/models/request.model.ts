export class Request {
    content: string;
    id: string;
    date: Date;
    senderId: string;
    senderName?: string;
    senderImage?: string;
    seen: Array<string>;
}
