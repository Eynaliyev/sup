export class Message {
    content: string;
    date: Date;
    id: number;
    senderId: number;
    roomId: number;
    //cosmetic properties added on front-end by the mapping function
    position?: string;
    time?: string;
}
