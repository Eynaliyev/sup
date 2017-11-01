import {Message} from './models';
import {Request} from './models';
interface VipStatus{
  vip: boolean;
  expiryDate: Date;
}
interface Photo {
    imgUrl: string;
    title?: string;
}
export interface Language {
  id: string;
  name: string;
}
interface BlockedUser {
	id: string,
	name: string,
	imgUrl: string,
	date: Date
}
interface Interest {
    id: string;
    name: string;
    imgUrl: string;
}
export interface Contact {
    id: string;
    name: string;
    profileImgUrl: string;
    roomId: string;
    lastMessage: Message;
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
    public contacts: Contact[],
		public friendRequests: Request[],
		public blockedList: BlockedUser[],
    public relationshipStatus?: string,
    public universityName?: string,
    public birthday?: string,
    public gender?: string,
    public about?: string,
    public company?: string,
    public profession?: string,
    public currentLocation?: string,
    public age?: number,
    public currentCoords?: number[],
    public currentRoomId?: string,
    public socialProfiles?: SocialProfile[],
    public profilePhoto?: Photo,
    public photos?: Photo[],
    public interests?: Interest[],
    public warning?: string,
    public languages?: Language[],
    public reputationScore?: number,
    public vipStatus?: VipStatus
  ) {  }
}
