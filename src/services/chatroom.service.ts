import { Injectable } from "@angular/core";
// import {Http} from '@angular/http';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Message, Chatroom, Language, Participant } from "../models/models";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";

@Injectable()
export class ChatroomService {
	constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {}

	getChatroomById(id: string): Observable<Chatroom> {
		// get full detailed data of the required chatroom
		return this.afs
			.doc(`chatrooms/${id}`)
			.valueChanges()
			.map(chatroom => this.toChatroom(chatroom));
	}
	toChatroom(obj: any): Chatroom {
		return obj;
	}
	joinChatroom(location, language: Language): Observable<any> {
		//switch to using whatever we had
		console.log("joinChatroom called");
		//let gender = JSON.parse(localStorage.getItem("currentUser")).gender;
		let gender = "male";
		let otherGender;
		if (gender === "male") {
			otherGender = "femaleParticipants";
		} else {
			otherGender = "maleParticipants";
		}
		// TO DO:
		// 1. [ ] get all rooms
		return new Observable(observer => {
			this.afs
				.doc(`chatrooms`)
				.valueChanges()
				.subscribe(chatrooms => {
					observer.next(chatrooms[0]);
				});
		});
	}
	leaveChatroom(chatroomId: string, userId: string): Promise<any> {
		// remove the user from participants list
		let participant = this.afs.doc(
			`chatrooms/${chatroomId}/participants/${userId}`
		);
		return new Promise(resolve => {
			participant
				.delete()
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
		let messageSeen = this.db.list(`messages/${chatroomId}/${messageId}/seen`);
		messageSeen.push(userId);
	}
	sendMessage(chatroomId: string, message: Message) {
		console.log("sending message: ", message);
		let messageRef = this.db.list(`messages/${chatroomId}`);
		messageRef.push(message);
	}
	// TO DO: implement actual paginated message getter function
	getMessages(chatroomId: string, start?, end?): Observable<any[]> {
		return this.db.list(`messages/${chatroomId}`).valueChanges();
	}
}
