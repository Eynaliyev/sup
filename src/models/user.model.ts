import {Message} from './message.model';

interface Photo {
    id: string;
    imgUrl: string;
    title?: string;
}
interface Interest {
    id: string;
    name: string;
    imgUrl: string;
}
interface Contact {
    id: string;
    name: string;
    canSeeMe: boolean;
    profileImgUrl: string;
    wantToSeeActivity: boolean;
}
interface Fact {
    id: string,
    date: string,
    text: string,
}

export class User {
  constructor(
    public id: string,
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
    public currentRoomId?: string,
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
