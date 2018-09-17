import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Request, User } from "../models/models";
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
	acceptFriendRequest(from: User, to: Request): Promise<any> {
		// 1. create friendships from with this user id
		// 2. the cloud function creates the second one
		// 3. the cloud function removes the request
		// 4. the cloud function creates the conversation
		// 5. the cloud function creates the message with the default one

		// Accept a contact request given the sender and receiver userId.
		return new Promise((resolve, reject) => {
			/*let newToContact: Contact = {
				id: to,
				createdAt:  moment().format("DD/MM/YYYY, hh:mm:ss"),
				lastMessage: {
					content: "Wuf Wuf! We're friends now!",
					createdAt:  moment().format("DD/MM/YYYY, hh:mm:ss"),
					id: messageId,
					roomId: roomId,
					sender: {
						id: "0",
						name: "Wuf Wuf",
						imageUrl: "assets/images/logo/logo.png"
					},
					seen: []
				}
			};
			let newFromContact: Contact = {
				id: from,
				createdAt:  moment().format("DD/MM/YYYY, hh:mm:ss"),
				lastMessage: {
					content: "Wuf Wuf! We're friends now!",
					createdAt:  moment().format("DD/MM/YYYY, hh:mm:ss"),
					id: messageId,
					roomId: roomId,
					sender: {
						id: "0",
						name: "Wuf Wuf",
						imageUrl: "assets/images/logo/logo.png"
					},
					seen: []
				}
			};
			this.cancelRequest(from, to)
				.then(() => {
					this.get("users/" + from)
						.then(ref => {
							ref
								.valueChanges()
								.take(1)
								.subscribe((user: User) => {
									if (!user.contacts) {
										user.contacts = [newToContact];
									} else {
										if (this.finInstance(user.contacts, newToContact) == -1) {
											user.contacts.push(newToContact);
										}
									}
									ref
										.update({
											contacts: user.contacts
										})
										.then(() => {
											this.get("users/" + to)
												.then(ref => {
													ref
														.valueChanges()
														.take(1)
														.subscribe((user: User) => {
															if (!user.contacts) {
																user.contacts = [newFromContact];
															} else {
																if (
																	this.finInstance(
																		user.contacts,
																		newFromContact
																	) == -1
																) {
																	user.contacts.push(newFromContact);
																}
															}
															ref
																.update({
																	contacts: user.contacts
																})
																.then(() => {
																	resolve();
																})
																.catch(() => {
																	reject();
																});
														});
												})
												.catch(() => {
													reject();
												});
										})
										.catch(() => {
											reject();
										});
								});
						})
						.catch(() => {
							reject();
						});
				})
				.catch(() => {
					reject();
				});*/
		});
	}

	sendRequest(from: User, to: User) {
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
			.set(newRequest);
	}
	// Cancel a contact request given the sender and receiver userId.
	rejectRequest(from: User, to: Request): Promise<any> {
		return new Promise((resolve, reject) => {});
	}
	// Cancel a contact request given the sender and receiver userId.
	cancelRequest(from: User, to: Request): Promise<any> {
		return new Promise((resolve, reject) => {});
	}
	block(id: string) {
		/*
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
	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return (
			s4() +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			s4() +
			s4()
		);
	}
	// generats a uniqueId for a relationship e.g. sent request and etc
	uniqueRelId(from: string, to: string): string {
		if (from <= to) {
			return from.concat(to);
		} else {
			return to.concat(from);
		}
	}
	finInstance(array: Array<any>, object): number {
		array.forEach((ins, index) => {
			if (this.deepEqual(ins, object)) {
				return index;
			}
		});
		return -1;
	}
	deepEqual(obj1, obj2) {
		JSON.stringify(obj1) === JSON.stringify(obj2);
	}
}
