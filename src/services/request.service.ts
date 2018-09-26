import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
	Request,
	User,
	Contact,
	Participant,
	Chatroom,
	Message
} from "../models/models";
import { UtilService } from "../shared/util.service";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireDatabase } from "angularfire2/database";
import * as moment from "moment";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class RequestService {
	private requests: Request[];
	constructor(
		private afs: AngularFirestore,
		public adb: AngularFireDatabase,
		public utilSrvc: UtilService
	) {
		this.requests = [];
	}
	getReceivedRequests(id: string): Observable<Request[]> {
		let result = [];
		return new Observable(observer => {
			this.afs
				.collection("requests_received")
				.doc(`${id}`)
				.collection("senders")
				.valueChanges()
				.subscribe(requests => {
					requests.forEach(request => {
						result.push(request);
					});
					observer.next(result);
				});
		});
	}
	getSentRequests(id: string): Observable<Request[]> {
		let result = [];
		return new Observable(observer => {
			this.afs
				.collection("requests_sent")
				.doc(`${id}`)
				.collection("recipients")
				.valueChanges()
				.subscribe(requests => {
					requests.forEach(request => {
						result.push(request);
					});
					observer.next(result);
				});
		});
	}
	updateRequestSeen(requestId: string, userId: string) {
		//add the id to the seen in the backend
	}
	acceptFriendRequest(curUsr: User, request: Request): Promise<any> {
		// Accept a contact request given the sender and receiver userId.
		// 1. create friendships from with this user id
		return new Promise((resolve, reject) => {
			var newContact: Contact = {
				id: request.sender.id,
				createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
				imgUrl: request.sender.imgUrl,
				firstName: request.sender.firstName,
				lastName: request.sender.lastName
			};
			this.afs
				.collection("friendships")
				.doc(curUsr.id)
				.collection("friends")
				.doc(request.sender.id)
				.set(newContact)
				.then(() => resolve(true))
				.catch(err => reject(err));
			this.createFriendship(newContact, curUsr, request.sender.id);
		});
	}

	sendRequest(from: User, to: User): Promise<any> {
		return new Promise((resolve, reject) => {
			let newRequest: Request = {
				createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
				seen: [],
				sender: {
					id: from.id,
					firstName: from.firstName,
					lastName: from.lastName,
					imgUrl: from.profilePhoto.imgUrl
				},
				recipient: {
					id: to.id,
					firstName: to.firstName,
					lastName: to.lastName,
					imgUrl: to.profilePhoto.imgUrl
				}
			};
			this.afs
				.collection("requests_sent")
				.doc(from.id)
				.collection("recipients")
				.doc(to.id)
				.set(newRequest)
				.then(() => resolve(true))
				.catch(err => reject(err));
		});
	}
	// Cancel a contact request given the sender and receiver userId.
	rejectRequest(curUsr: User, to: Request): Promise<any> {
		return new Promise((resolve, reject) => {
			// remove received request
			this.afs
				.collection("requests_received")
				.doc(curUsr.id)
				.collection("senders")
				.doc(to.sender.id)
				.delete()
				.then(() => resolve(true))
				.catch(err => reject(err));
		});
	}
	// Cancel a contact request given the sender and receiver userId.
	cancelRequest(curUsrId: string, toId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			// remove sent request
			this.afs
				.collection("requests_sent")
				.doc(curUsrId)
				.collection("recipients")
				.doc(toId)
				.delete()
				.then(() => resolve(true))
				.catch(err => reject(err));
		});
	}
	block(from: User, to: User): Promise<any> {
		let newRequest: Request = {
			createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
			seen: [],
			sender: {
				id: from.id,
				firstName: from.firstName,
				lastName: from.lastName,
				imgUrl: from.profilePhoto.imgUrl
			},
			recipient: {
				id: to.id,
				firstName: to.firstName,
				lastName: to.lastName,
				imgUrl: to.profilePhoto.imgUrl
			}
		};
		// 2. [ ] set the relations collection
		let blockReqRef = this.afs
			.collection("blocks_sent")
			.doc(from.id)
			.collection("recipients")
			.doc(to.id)
			.set(newRequest);
		//3. [ ] remove from contacts if he’s there
		// this user contact
		let removeFriendRelRef = this.afs
			.collection("friendships")
			.doc(from.id)
			.collection("friends")
			.doc(to.id)
			.delete();
		// other user contact
		let removeOtherFriendRelRef = this.afs
			.collection("friendships")
			.doc(to.id)
			.collection("friends")
			.doc(from.id)
			.delete();

			return Promise.all([blockReqRef, removeFriendRelRef, removeOtherFriendRelRef]);
	}
	unblock(id: string) {
		/*
			1. [ ] set it back to null, without adding the false
			2. [ ] remove from blocked list
		*/
		console.error(
			"unblock method in user service called, but has not been implemented yet"
		);
	}
	hasLiked(fromId: string, toId: string): Promise<boolean> {
		// check the relationship whether current user is set to true or not while the other is not
		return new Promise((resolve, reject) => {
			this.afs
				.collection("requests_sent")
				.doc(fromId)
				.collection("recipients")
				.doc(toId)
				.snapshotChanges()
				.subscribe(
					res => {
						console.log("this user was liked already: ", res.payload.exists);
						resolve(res.payload.exists);
					},
					err => reject(err)
				);
		});
	}
	createFriendship(newVal, receiver: User, senderId) {
		// other user's relationship and request logic
		const newValue = newVal;
		// need to get the toId wildcard from the URL
		const requestReceiverId = receiver.id; //context.params.fromId;
		const requestSenderId = senderId; //context.params.toId;
		const conversationId = this.utilSrvc.uniqueRelId(
			requestReceiverId,
			requestSenderId
		);
		const newContact = {
			id: requestReceiverId,
			createdAt: newValue.createdAt,
			imgUrl: receiver.profilePhoto.imgUrl,
			firstName: receiver.firstName,
			lastName: receiver.lastName
		};
		// 2. the cloud function creates the second one
		this.afs
			.collection("friendships")
			.doc(requestSenderId)
			.collection("friends")
			.doc(requestReceiverId)
			.set(newContact);
		// 3. delete the request sent
		this.afs
			.collection("requests_sent")
			.doc(requestSenderId)
			.collection("recipients")
			.doc(requestReceiverId)
			.delete();
		// 3.5 delete the request received
		this.afs
			.collection("requests_received")
			.doc(requestReceiverId)
			.collection("senders")
			.doc(requestSenderId)
			.delete();
		// 4. the cloud function creates the conversation
		const senderUserRef = this.afs
			.collection("users")
			.doc(requestSenderId)
			.valueChanges();
		const recipientUserRef = this.afs
			.collection("users")
			.doc(requestReceiverId)
			.valueChanges();
		let senderUser;
		let recipientUser;
		let senderParticipant: Participant;
		let recipientParticipant: Participant;
		let participants: Participant[];
		let newChatroom: Chatroom;
		let newConversationDoc;
		let newMessage: Message;
		senderUserRef
			.flatMap(snUsr => {
				senderUser = snUsr;
				senderParticipant = {
					id: senderUser.id,
					firstName: senderUser.firstName,
					lastName: senderUser.lastName,
					imgUrl: senderUser.profilePhoto.imgUrl
				};
				return recipientUserRef;
			})
			.subscribe(recUsr => {
				recipientUser = recUsr;
				recipientParticipant = {
					id: recipientUser.id,
					firstName: recipientUser.firstName,
					lastName: recipientUser.lastName,
					imgUrl: recipientUser.profilePhoto.imgUrl
				};
				participants = [senderParticipant, recipientParticipant];
				newChatroom = {
					id: conversationId,
					participants: participants,
					messages: []
				};
				console.log(
					"recUsr: ",
					recUsr,
					"senderParticipant: ",
					senderParticipant,
					"recipientParticipant: ",
					recipientParticipant,
					"newChatroom: ",
					newChatroom,
					"participants: ",
					participants
				);
				//creating the conversation in the firestore
				this.afs
					.collection("conversations")
					.doc(newChatroom.id)
					.set(newChatroom);
				// 5. the cloud function creates the message with the default one
				newMessage = {
					content: "Woof, Woof, You are now connected!",
					createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
					id: this.utilSrvc.guid() + newChatroom.id + "001",
					roomId: newChatroom.id,
					sender: {
						id: "001",
						firstName: "Woof",
						lastName: "Woof",
						imgUrl: "assets/images/other-assets/profile.png"
					},
					seen: []
				};
				this.adb
					.object(`/messages/${newMessage.roomId}/${newMessage.id}`)
					.set(newMessage);
			});
	}
}
