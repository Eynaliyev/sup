import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Request, User, Contact } from "../models/models";
import { AngularFirestore } from "angularfire2/firestore";
import * as moment from "moment";

@Injectable()
export class RequestService {
	private requests: Request[];
	constructor(private afs: AngularFirestore) {
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
	cancelRequest(curUsr: User, to: Request): Promise<any> {
		return new Promise((resolve, reject) => {
			// remove sent request
			this.afs
				.collection("requests_sent")
				.doc(curUsr.id)
				.collection("recipients")
				.doc(to.recipient.id)
				.delete()
				.then(() => resolve(true))
				.catch(err => reject(err));
		});
	}
	block(id: string) {
		/* TO BE IMPLEMENTED LATER
		2. [ ] set the relations collection
		3. [ ] remove from contacts if he’s there
		4. [ ] kick the user out of the chatroom and tell him he was kicked out
		*/
		console.error(
			"block method in user service called, but has not been implemented yet"
		);
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
	hasLiked(fromId: string, toId: string) {
		// check the relationship whether current user is set to true or not while the other is not
	}
	createFriendship(newVal, receiver: User, senderId) {
		const newValue = newVal;
		// need to get the toId wildcard from the URL
		const requestReceiverId = receiver.id; //context.params.fromId;
		const requestSenderId = senderId; //context.params.toId;
		const conversationId = this.uniqueRelId(requestReceiverId, requestSenderId);
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
		/*const sendRequestDoc = admin
			.firestore()
			.collection("requests_sent")
			.doc(requestSenderId)
			.collection("recipients")
			.doc(requestReceiverId)
			.delete();
		// 3.5 delete the request received
		const receivedRequestDoc = admin
			.firestore()
			.collection("requests_received")
			.doc(requestReceiverId)
			.collection("senders")
			.doc(requestSenderId)
			.delete();
		// 4. the cloud function creates the conversation
		const senderUserRef = admin
			.firestore()
			.collection("users")
			.doc(requestSenderId)
			.get();
		const recipientUserRef = admin
			.firestore()
			.collection("users")
			.doc(requestReceiverId)
			.get();
		let senderUser;
		let recipientUser;
		let senderParticipant: Participant;
		let recipientParticipant: Participant;
		let participants: Participant[];
		let newChatroom: Chatroom;
		let newConversationDoc;
		let newMessage: Message;
		senderUserRef
			.then(snUsr => {
				senderUser = snUsr;
				senderParticipant = {
					id: senderUser.id,
					firstName: senderUser.firstName,
					lastName: senderUser.lastName,
					imgUrl: senderUser.imgUrl
				};
				return recipientUserRef;
			})
			.then(recUsr => {
				recipientUser = recUsr;
				recipientParticipant = {
					id: recipientUser.id,
					firstName: recipientUser.firstName,
					lastName: recipientUser.lastName,
					imgUrl: recipientUser.imgUrl
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
				newConversationDoc = admin
					.firestore()
					.collection("conversations")
					.doc(newChatroom.id)
					.set(newChatroom);
				// 5. the cloud function creates the message with the default one
				newMessage = {
					content: "Woof, Woof, You are now connected!",
					createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
					id: guid() + newChatroom.id + "001",
					roomId: newChatroom.id,
					sender: {
						id: "001",
						firstName: "Woof",
						lastName: "Woof",
						imgUrl: "assets/images/other-assets/profile.png"
					},
					seen: []
				};
				admin
					.database()
					.ref(`/messages${newMessage.roomId}`)
					.push(newMessage);
			});*/
	}
	uniqueRelId(from: string, to: string): string {
		if (from <= to) {
			return from.concat(to);
		} else {
			return to.concat(from);
		}
	}
}
