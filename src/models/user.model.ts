import { AngularFirestoreCollection } from "angularfire2/firestore";
import { Message, Request } from "./models";
interface VipStatus {
	vip: boolean;
	expiryDate: Date;
	dateAdded: Date;
	type: string;
}
interface Photo {
	imgUrl: string;
}
export interface Language {
	id: string;
	name: string;
}
interface Interest {
	id: string;
	name: string;
	imgUrl?: string;
}
export interface Contact {
	id: string;
	dateAdded: Date;
	lastMessage: Message;
}
interface SocialProfile {
	networkName: string;
	id: string;
}

export class User {
	constructor(
		public about: string,
		public birthday: string,
		public contacts: Contact[],
		public currentCoords: number[],
		public currentLocation: string,
		public email: string,
		public firstName: string,
		public gender: string,
		public id: string,
		public languages: Language[],
		public lastName: string,
		public company?: string,
		public interests?: Interest[],
		public profession?: string,
		public profilePhoto?: Photo,
		public relationshipStatus?: string,
		public reputationScore?: number,
		public requests?: Request[],
		public socialProfiles?: SocialProfile[],
		public universityName?: string,
		public vipStatus?: VipStatus,
		public warning?: string
	) {}
}
