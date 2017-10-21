export class Request {
    content: string;
    date: Date;
    id: string;
    senderId: string;
    seen: Array<string>;
    roomId?: string;
    senderName?: string;
    senderImage?: string;
}
