import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { User, Request, Contact } from "../models/models";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";

@Injectable()
export class RequestService {
	private requests: Request[];
	constructor(private afs: AngularFirestore) {
		this.requests = [];
	}
	// Get an object from Firestore by its path. For eg: firestore.get('users/' + userId) to get a user object.
	public get(path: string): Promise<AngularFirestoreDocument<{}>> {
		return new Promise(resolve => {
			resolve(this.afs.doc(path));
		});
	}
	getReceivedRequests(id: string): AngularFirestoreCollection<Request> {
		return this.afs.collection("users/" + id + "/requestsReceived");
	}
	updateRequestSeen(requestId: string, userId: string) {
		//add the id to the seen in the backend
	}
	acceptFriendRequest(from: string, to: string): Promise<any> {
		let messageId = this.guid();
		let roomId = this.uniqueRelId(from, to);
		/* make sure this is async method that returns
		a success or failure that prompts a relevant
		alert in the caller's UI
		1. [ ] create a new chatroom
		3. [ ] add to relationships list/collection
		*/
		// Accept a contact request given the sender and receiver userId.
		return new Promise((resolve, reject) => {
			let newToContact: Contact = {
				id: to,
				dateAdded: new Date(),
				lastMessage: {
					content: "Wuf Wuf! We're friends now!",
					date: new Date(),
					id: messageId,
					senderId: "0",
					roomId: roomId,
					senderName: "Wuf Wuf",
					senderImage: "assets/images/logo/logo.png",
					seen: []
				}
			};
			let newFromContact: Contact = {
				id: from,
				dateAdded: new Date(),
				lastMessage: {
					content: "Wuf Wuf! We're friends now!",
					date: new Date(),
					id: messageId,
					senderId: "0",
					roomId: roomId,
					senderName: "Wuf Wuf",
					senderImage: "assets/images/logo/logo.png",
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
				});
		});
	}

	sendRequest(from: string, to: string) {
		let newRequest: Request = {
			id: this.uniqueRelId(from, to),
			date: new Date(),
			seen: [],
			senderId: from,
			toUserId: to
		};
		return new Promise((resolve, reject) => {
			this.get("users/" + from)
				.then(ref => {
					ref
						.valueChanges()
						.take(1)
						.subscribe((user: User) => {
							if (!user.requestsSent) {
								user.requestsSent = [newRequest];
							} else {
								if (this.finInstance(user.requestsSent, newRequest) == -1) {
									user.requestsSent.push(newRequest);
								}
							}
							ref
								.update({
									requestsSent: user.requestsSent
								})
								.then(() => {
									this.get("users/" + to)
										.then(ref => {
											ref
												.valueChanges()
												.take(1)
												.subscribe((user: User) => {
													if (!user.requestsReceived) {
														user.requestsReceived = [newRequest];
													} else {
														if (
															this.finInstance(
																user.requestsReceived,
																newRequest
															) == -1
														) {
															user.requestsReceived.push(newRequest);
														}
													}
													ref
														.update({
															requestsReceived: user.requestsReceived
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
		});
	}
	// Cancel a contact request given the sender and receiver userId.
	cancelRequest(from: string, to: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.get("users/" + from)
				.then(ref => {
					ref
						.valueChanges()
						.take(1)
						.subscribe((user: User) => {
							if (user.requestsSent) {
								let indexTo = user.requestsSent.findIndex(
									i => i.toUserId === to
								);
								user.requestsSent.splice(indexTo, 1);
								if (user.requestsSent.length == 0) {
									user.requestsSent = null;
								}
								ref
									.update({
										requestsSent: user.requestsSent
									})
									.then(() => {
										this.get("users/" + to)
											.then(ref => {
												ref
													.valueChanges()
													.take(1)
													.subscribe((user: User) => {
														if (user.requestsReceived) {
															let indexTo = user.requestsReceived.findIndex(
																i => i.senderId === from
															);
															user.requestsReceived.splice(indexTo, 1);
															if (user.requestsReceived.length == 0) {
																user.requestsReceived = null;
															}
															ref
																.update({
																	requestsReceived: user.requestsReceived
																})
																.then(() => {
																	resolve();
																})
																.catch(() => {
																	reject();
																});
														}
													});
											})
											.catch(() => {
												reject();
											});
									})
									.catch(() => {
										reject();
									});
							} else {
								reject();
							}
						});
				})
				.catch(() => {
					reject();
				});
		});
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
