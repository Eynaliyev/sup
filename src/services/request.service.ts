import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Request, User, Contact } from "../models/models";
import { AngularFirestore } from "angularfire2/firestore";
import { UtilService } from "../services/services";
import * as moment from "moment";
import { resolve } from "url";

@Injectable()
export class RequestService {
	private requests: Request[];
	constructor(private afs: AngularFirestore, public utilSrvc: UtilService) {
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
			let newContact: Contact = {
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
}
