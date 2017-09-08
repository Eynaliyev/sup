import {Message} from './message.model';

interface Photo {
    id: number;
    imgUrl: string;
    title?: string;
}
interface Interest {
    id: number;
    name: string;
    imgUrl: string;
}
interface Contact {
    id: number;
    name: string;
    canSeeMe: boolean;
    profileImgUrl: string;
    wantToSeeActivity: boolean;
}
interface Fact {
    id: number,
    date: string,
    text: string,
}

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public status: string,
    public universityName: string,
    public birthday: string,
    public gender: string,
    public about: string,
    public job: string,
    public profession: string,
    public history: Fact[],
    public currentLocation: string,
    public contacts: Contact[],
    public meassages: Message[],
    public phoneNumbers?: string[],
    public email?: string,
    public currentRoomId?: number,
    public facebook?: string,
    public google?: string,
    public profilePhoto?: Photo,
    public photos?: Photo[],
    public coverPhoto?: Photo,
    public interests?: Interest[],
    public warning?: string,
    public reputationScore?: number,
  ) {  }
}
