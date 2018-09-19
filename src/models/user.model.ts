interface VipStatus {
	vip: boolean;
	expiryDate: Date;
	dateAdded: Date;
	type: string;
}
export interface Photo {
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
interface SocialProfile {
	networkName: string;
	id: string;
}

export class User {
	constructor(
		public about: string,
		public birthday: string,
		public currentCoords: number[],
		public email: string,
		public firstName: string,
		public gender: string,
		public id: string,
		public languages: Language[],
		public lastName: string,
		public company?: string,
		public currentLocation?: string,
		public interests?: Interest[],
		public photos?: Photo[],
		public profession?: string,
		public profilePhoto?: Photo,
		public relationshipStatus?: string,
		public reputationScore?: number,
		public socialProfiles?: SocialProfile[],
		public universityName?: string,
		public vipStatus?: VipStatus,
		public warning?: string
	) {}
}
