import { AngularFirestoreCollection } from "angularfire2/firestore";
import { Message, UserConversation, UserGroup, Request } from "./models";
interface VipStatus {
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
	id: string;
	date: Date;
}
interface Interest {
	id: string;
	name: string;
	imgUrl?: string;
}
export interface Contact {
	id: string;
	dateAdded: Date;
}

interface SocialProfile {
	networkName: string;
	id: string;
}

export class User {
	constructor(
		public id: string,
		public email: string,
		public firstName: string,
		public lastName: string,
		public about: string,
		public contacts: Contact[],
		public blockedList: BlockedUser[],
		public requestsSent: Request[], //userIds whom you sent a contact request
		public requestsReceived: Request[], //userIds who sent you a contact request
		public conversations: AngularFirestoreCollection<UserConversation>,
		public groups: AngularFirestoreCollection<UserGroup>,
		public pushToken: string,
		public notifications: boolean,
		public relationshipStatus?: string,
		public universityName?: string,
		public birthday?: string,
		public gender?: string,
		public company?: string,
		public profession?: string,
		public currentLocation?: string,
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
	) {}
}
