import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { User, Request, Contact } from "../models/models";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";

@Injectable()
export class ContactService {
	private contacts: Contact[];
	constructor(private afs: AngularFirestore) {
		this.contacts = [];
	}
	// Get an object from Firestore by its path. For eg: firestore.get('users/' + userId) to get a user object.
	public get(path: string): Promise<AngularFirestoreDocument<{}>> {
		return new Promise(resolve => {
			resolve(this.afs.doc(path));
		});
	}
	getContacts(id: string): Observable<Contact[]> {
		let result = [];
		return new Observable(observer => {
			this.afs
				.collection("relationships/")
				.doc("${id}")
				.collection("user-id")
				.valueChanges()
				.subscribe(relationships => {
					relationships.forEach(relationship => {
						if (relationship["relationshipType"] === "Friendship") {
							result.push(this.relationshipToContact(relationship));
						}
					});
					observer.next(result);
				});
		});
	}
	relationshipToContact(data: any): Contact {
		let contact: Contact = {
			id: data.id,
			createdAt: data.createdAt,
			lastMessage: data.lastMessage,
			imgUrl: data.imgUrl
		};
		return contact;
	}
}
