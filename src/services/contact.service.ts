import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Contact } from "../models/models";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class ContactService {
	private contacts: Contact[];
	constructor(private afs: AngularFirestore) {
		this.contacts = [];
	}
	// Get an object from Firestore by its path. For eg: firestore.get('users/' + userId) to get a user object.
	getContacts(id: string): Observable<Contact[]> {
		return new Observable(observer => {
			this.afs
				.collection("friendships")
				.doc(`${id}`)
				.collection("friends")
				.valueChanges()
				.subscribe(
					relationships => {
						let result = [];
						relationships.forEach(relationship => {
							result.push(this.relationshipToContact(relationship));
						});
						observer.next(result);
					},
					error => {
						throw new Error("Error: Getting document:"); // throw an Error
					}
				);
		});
	}
	relationshipToContact(data: any): Contact {
		let contact: Contact = {
			id: data.id,
			createdAt: data.createdAt,
			lastMessage: data.lastMessage,
			imgUrl: data.imgUrl,
			firstName: data.firstName,
			lastName: data.lastName
		};
		return contact;
	}
	isFriend(curUsrId, toId): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.afs
				.collection("friendships")
				.doc(curUsrId)
				.collection("friends")
				.doc(toId)
				.snapshotChanges()
				.subscribe(
					res => {
						console.log("this user is friend already: ", res.payload.exists);
						resolve(res.payload.exists);
					},
					err => reject(err)
				);
		});
	}
	removeFriend(curUsrId, otherId): Promise<any> {
		//this user friendship
		let thisUserRef = this.afs
			.collection("friendships")
			.doc(curUsrId)
			.collection("friends")
			.doc(otherId)
			.delete()
			.catch(err => console.error(err));

		//other user friendsgip
		let otherUserRef = this.afs
			.collection("friendships")
			.doc(otherId)
			.collection("friends")
			.doc(curUsrId)
			.delete()
			.catch(err => console.error(err));
		return Promise.all([thisUserRef, otherUserRef]);
	}
}
