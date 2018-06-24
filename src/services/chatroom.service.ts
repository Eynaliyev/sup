import { Injectable } from "@angular/core";
// import {Http} from '@angular/http';
import { AngularFireDatabase } from "angularfire2/database";
import {
	AngularFirestore
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Message, Chatroom, Language, Participant } from "../models/models";

@Injectable()
export class ChatroomService {
	// private messages: Message[];
	// private chatrooms: Chatroom[];
	// private languages: Language[];
	constructor(
		// private http: Http,
		private db: AngularFireDatabase
	) {}
	getAvailableChatrooms(location, language: Language): Observable<any[]> {
		console.log("getAvailableChatrooms called");
		//let gender = JSON.parse(localStorage.getItem("currentUser")).gender;
		let gender = 'male';
		let otherGender;
		if (gender === "male") {
			otherGender = "femaleParticipants";
		} else {
			otherGender = "maleParticipants";
		}
		// TO DO:
		// 1. [ ] get all rooms
		return this.db.list(`chatrooms`).valueChanges();
		// .filter(room => room[otherGender].length < 2)
		// .filter(relevantRooms => releaseEvents.language === language);
		// 2. [ ] filter out rooms with less than 3 participants of opposite gender
		// 3. [ ] filter by language
		// 4. [ ] sort by distance from user - calculate average from users’ locations
		// 5. [ ] join the room
		// 6. [ ] if none create room
		// with given language and add the user to the participants list of his gender to it
	}
	getChatroomById(id: string): Observable<Chatroom> {
		// get full detailed data of the required chatroom
		return this.db
			.object(`chatrooms/${id}`)
			.valueChanges()
			.map(chatroom => this.toChatroom(chatroom));
	}
	toChatroom(obj: any): Chatroom {
		return obj;
	}
	joinChatroom(location, language: Language): Observable<any> {
		console.log("joinChatroom called");
		// perhaps should be a cloud function?
		// find available rooms
		// join it - https://angularfirebase.com/lessons/managing-firebase-user-relationships-to-database-records/#3-Data-that-Belongs-to-Multiple-Users
		// if no chatroom available create a new one., add gender equality, maleCount, femaleCount
		// add the user to the participants list for the room
		// get chatroom id - save it in local storage
		// get chatroom details by the id?
		// get messages for the room - first 15 for example
		// return the chatroom details
		return new Observable(observer => {
			this.getAvailableChatrooms(location, language).subscribe(
				chatrooms => {
					if (chatrooms && chatrooms.length !== 0) {
						console.log("available chatrooms: ", chatrooms);
						observer.next(chatrooms[0]);
					} else {
						this.createChatroom(location, language).then(() => {
							console.log("createChatroom completed");
							this.getAvailableChatrooms(location, language).subscribe(
								chatrooms => {
									console.log("available chatrooms: ", chatrooms);
									observer.next(chatrooms[0]);
								}
							);
						});
					}
				},
				err => {
					console.error(err);
				}
			);
		});
	}
	//creates a group chatroom
	createChatroom(location, language: Language) {
		console.log("createChatroom called ");
		let user = JSON.parse(localStorage.getItem("currentUser"));
		let gender = user.gender;
		let thisGender;
		if (gender === "female") {
			thisGender = "femaleParticipants";
		} else {
			thisGender = "maleParticipants";
		}
		let randomId;
		let chatroom = {
			id: randomId,
			femaleParticipants: [],
			maleParticipants: [],
			language: language,
			messages: [],
			blocked: [],
			warnings: [],
			privateConversation: false
		};
		let name = user.firstName + " " + user.lastName;
		console.log(name, user, thisGender, chatroom[thisGender]);
		let participant: Participant = {
			id: user.id,
			name: name,
			votes: 0,
			profileImgUrl: user.photoUrl
		};
		console.log(user, participant);
		chatroom[thisGender].push(participant);
		console.log("creating chatroom: ", chatroom, user);
		return this.db.object(`chatrooms/${randomId}`).set(chatroom);
	}
	leaveChatroom(chatroomId: string, userId: string): Promise<any> {
		// remove the user from participants list
		let participant = this.db.object(
			`chatrooms/${chatroomId}/participants/${userId}`
		);
		return new Promise(resolve => {
			participant
				.remove()
				.then(() => {
					resolve(true);
				})
				.catch(err => console.log(err));
		});

		// publish a 'left the room  type of message' - a cloud function?
		// remove the chatroom id from local storage
	}
	updateSeen(chatroomId: string, messageId: string, userId: string) {
		console.log(
			"updating seen of: ",
			chatroomId,
			messageId,
			"with user id: ",
			userId
		);
		let messageSeen = this.db.list(
			`chatrooms/${chatroomId}/messages/${messageId}/seen`
		);
		messageSeen.push(userId);
	}
	sendMessage(chatroomId: string, message: Message) {
		console.log("sending message: ", message);
		let messageRef = this.db.list(`chatrooms/${chatroomId}/messages`);
		messageRef.push(message);
	}
	// TO DO: implement actual paginated message getter function
	getMessages(chatroomId: string, start?, end?): Observable<any[]> {
		return this.db.list(`chatrooms/${chatroomId}/messages`).valueChanges();
	}
}
