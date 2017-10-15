interface Photo {
    imgUrl: string;
    title?: string;
}
interface Language {
  id: string;
  name: string;
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
interface SocialProfile{
  networkName: string;
  id: string;
}

export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public relationshipStatus: string,
    public universityName: string,
    public birthday: string,
    public gender: string,
    public about: string,
    public company: string,
    public profession: string,
    public currentLocation: string,
    public age: number,
    public contacts: Contact[],
    public currentRoomId?: string,
    public socialProfiles?: SocialProfile[],
    public profilePhoto?: Photo,
    public photos?: Photo[],
    public interests?: Interest[],
    public warning?: string,
    public languages?: Language[],
    public reputationScore?: number,
  ) {  }
}
