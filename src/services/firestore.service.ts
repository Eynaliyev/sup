import { Injectable } from "@angular/core";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";
import "rxjs/add/operator/take";
import { User } from "../models/models";

@Injectable()
export class FirestoreService {
	constructor(private afs: AngularFirestore) {}

	// Get an object from Firestore by its path. For eg: firestore.get('users/' + userId) to get a user object.
	public get(path: string): Promise<AngularFirestoreDocument<{}>> {
		return new Promise(resolve => {
			resolve(this.afs.doc(path));
		});
	}

	// Check if the object exists on Firestore. Returns a boolean promise with true/false.
	public exists(path: string): Promise<boolean> {
		return new Promise(resolve => {
			this.afs
				.doc(path)
				.valueChanges()
				.take(1)
				.subscribe(res => {
					if (res) {
						resolve(true);
					} else {
						resolve(false);
					}
				});
		});
	}

	// Get all users on Firestore ordered by their firstNames.
	public getUsers(): AngularFirestoreCollection<User> {
		return this.afs.collection("users", ref => ref.orderBy("firstName"));
	}
}
