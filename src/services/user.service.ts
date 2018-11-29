import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { User } from "../models/models";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireDatabase } from "angularfire2/database";
import { ReplaySubject } from "rxjs/ReplaySubject";
//import { Camera } from 'ionic-native';
import * as moment from "moment";
import { UtilService } from "../shared/util.service";

@Injectable()
export class UserService {
	public currentUser: ReplaySubject<User> = new ReplaySubject<User>();
	private access_token = ``;

	constructor(
		public http: Http,
		private afs: AngularFirestore,
		private db: AngularFireDatabase,
		public utilSrvc: UtilService
	) {}
	// get a specific User by id - that conforms to the user model
	getUserById(id: string): Observable<any> {
		//Observable<User> {
		// gathering of info
		return this.afs.doc(`/users/${id}`).valueChanges();
	}
	getCurrentUser(): ReplaySubject<User> {
		return this.currentUser;
	}
	setAccessToken(token): void {
		this.access_token = token;
	}
	//should return promise that resolves once the data can be returned
	setCurrentUser(usr): Promise<any> {
		return new Promise<any>(resolve => {
			let uid = usr["uid"];
			this.getUserById(uid).subscribe(
				user => {
					if (user) {
						let parsedUser = this.toUser(user);
						this.currentUser.next(parsedUser);
						localStorage.setItem("currentUser", JSON.stringify(user));
						resolve(true);
					} else {
						//graph request, create new user with the return
						this.fetchGraphData()
							.then(parsedData => {
								this.createUser(parsedData)
									.then(() => resolve(true))
									.catch(error => this.handleError(error));
							})
							.catch(err => {
								console.log("Error:", err);
							});
					}
				},
				error => {
					this.handleError(error);
				}
			);
		});
	}
	fetchGraphData(): Promise<any> {
		let url = `https://graph.facebook.com/v2.12/me?access_token=${
			this.access_token
		}&fields=id,name,gender,locale,picture.type(large),email,first_name,last_name,birthday`;
		return new Promise<any>(resolve => {
			this.http.get(url).subscribe(
				userInfo => {
					console.log("user info from fb api: ", JSON.stringify(userInfo));
					let parsedData = JSON.parse(userInfo["_body"]);
					resolve(parsedData);
				},
				err => {
					this.handleError(err);
				}
			);
		});
	}
	mapFbtoModel(data) {
		let res = {
			about: data.about ? data.about : "",
			birthday: data.birthday ? data.birthday : "",
			currentCoords: data.currentCoords ? data.currentCoords : [],
			email: data.email ? data.email : "",
			firstName: data.first_name ? data.first_name : "",
			gender: data.gender ? data.gender : "",
			id: data.id ? data.id : "",
			languages: data.locale ? [data.locale] : [],
			lastName: data.last_name ? data.last_name : "",
			company: data.company ? data.company : "",
			currentLocation: data.currentLocation ? data.currentLocation : [],
			interests: data.interests ? data.interests : [],
			photos: data.photos
				? data.photos.forEach(photo => {
						photo = {
							imgUrl: photo.imgUrl
						};
				  })
				: [{ imgUrl: "" }],
			profilePhoto: data.picture.data.url
				? {
						imgUrl: data.picture.data.url
				  }
				: { imgUrl: "" },
			relationshipStatus: data.relationshipStatus
				? data.relationshipStatus
				: [],
			reputationScore: data.reputationScore ? data.reputationScore : 0,
			socialProfiles: data.socialProfiles ? data.socialProfiles : [],
			universityName: data.universityName ? data.universityName : "",
			vipStatus: data.vipStatus ? data.vipStatus : {},
			warning: data.warning ? data.warning : ""
		};
		return res;
	}
	// create user in firebase
	createUser(userCredentials): Promise<any> {
		// convert info to our model
		let user = this.mapFbtoModel(userCredentials);
		// set it in the backend
		console.log("creating user: ", user);
		return this.afs
			.doc(`/users/${user.id}`)
			.set(user)
			.then(() => console.log("user set: ", user))
			.catch(error => this.handleError(error));
	}
	updateUser(userData: User): Promise<any> {
		localStorage.setItem("currentUser", JSON.stringify(userData));
		this.currentUser.next(userData);
		return this.afs
			.doc(`users/${userData.id}`)
			.set(userData, { merge: true })
			.then(() => console.log("updating info: ", userData.id))
			.catch(error => this.handleError(error));
	}
	// converts the backend user into the viewmodel of the user
	toUser(data): User {
		let user = {
			about: data.about ? data.about : "",
			birthday: data.birthday ? data.birthday : "",
			currentCoords: data.currentCoords ? data.currentCoords : [],
			email: data.email ? data.email : "",
			firstName: data.firstName ? data.firstName : "",
			gender: data.gender ? data.gender : "",
			id: data.id ? data.id : "",
			languages: data.languages ? data.languages : [],
			lastName: data.lastName ? data.lastName : "",
			company: data.company ? data.company : "",
			currentLocation: data.currentLocation ? data.currentLocation : [],
			interests: data.interests ? data.interests : [],
			photos: data.photos
				? data.photos.forEach(photo => {
						photo = {
							imgUrl: photo.imgUrl
						};
				  })
				: [{ imgUrl: "" }],
			profilePhoto: data.profilePhoto
				? {
						imgUrl: data.profilePhoto.imgUrl
				  }
				: { imgUrl: "" },
			relationshipStatus: data.relationshipStatus
				? data.relationshipStatus
				: [],
			reputationScore: data.reputationScore ? data.reputationScore : 0,
			socialProfiles: data.socialProfiles ? data.socialProfiles : [],
			universityName: data.universityName ? data.universityName : "",
			vipStatus: data.vipStatus ? data.vipStatus : {},
			warning: data.warning ? data.warning : ""
		};
		return user;
	}
	addImage(userId: string, image): Promise<any> {
		let photos = this.afs.collection(`users/${userId}/photos`);
		return photos.add(image).catch(error => this.handleError(error));
	}
	deleteImage(userId: string, imageUrl: string): Promise<any> {
		let image = this.afs.doc(`users/${userId}/photos/${imageUrl}`);
		return image.delete().catch(error => this.handleError(error));
	}
	//creates an individual room for the two users
	createConversation(fromId: string, toId: string) {
		let roomId = this.utilSrvc.uniqueRelId(fromId, toId);
		let dbRef = this.afs.doc(`chatrooms/${roomId}`);
		this.getUserById(toId).subscribe(user => {
			let conversation: any = {
				createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
				participants: [this.currentUser, user]
			};
			this.sendWelcomeConversationMessage(roomId);
			return dbRef.set(conversation);
		});
	}
	sendWelcomeConversationMessage(roomId) {
		let defaultMessage = {
			content: "you are now connected!",
			createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
			senderId: 1111
		};
		this.db.list(`messages/${roomId}`).push(defaultMessage);
	}
	removeConversation(id) {
		let dbRef = this.afs.doc(`chatrooms/${id}`);
		return dbRef.delete();
	}
	private handleError(error: any): Promise<any> {
		console.error("Error: ", error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
