import { Injectable } from "@angular/core";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";
import "rxjs/add/operator/take";
import { User, Conversation } from "../models/models";

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
/*
	// Get all conversations on Firestore.
	public getConversations(): AngularFirestoreCollection<{}> {
		return this.afs.collection("conversations");
	}

	// Get all conversations of user on Firestore.
	public getUserConversations(userId: string): AngularFirestoreCollection<{}> {
		return this.afs.collection("users/" + userId + "/conversations");
	}

	// Get conversation info of a user with their partner on Firestore.
	public getUserConversation(
		userId: string,
		partnerId: string
	): AngularFirestoreDocument<{}> {
		return this.afs.doc("users/" + userId + "/conversations/" + partnerId);
	}

	// Get all groups on Firestore.
	public getGroups(): AngularFirestoreCollection<{}> {
		return this.afs.collection("groups");
	}

	// Get all groups of user on Firestore.
	public getUserGroups(userId: string): AngularFirestoreCollection<{}> {
		return this.afs.collection("users/" + userId + "/groups");
	}

	// Get group info of a user with the groupId on Firestore.
	public getUserGroup(
		userId: string,
		groupId: string
	): AngularFirestoreDocument<{}> {
		return this.afs.doc("users/" + userId + "/groups/" + groupId);
	}

	// Get userData of a user given the username. Return the userData promise.
	public getUserByUsername(username: string): Promise<User> {
		return new Promise(resolve => {
			this.afs
				.collection("users", ref => ref.where("username", "==", username))
				.valueChanges()
				.take(1)
				.subscribe((res: User[]) => {
					if (res.length > 0) {
						resolve(res[0]);
					} else {
						resolve();
					}
				});
		});
	}

	// Get userData of a user given the pushToken. Return the userData promise.
	public getUserByPushToken(token: string): Promise<User> {
		return new Promise(resolve => {
			this.afs
				.collection("users", ref => ref.where("pushToken", "==", token))
				.valueChanges()
				.take(1)
				.subscribe((res: User[]) => {
					if (res.length > 0) {
						resolve(res[0]);
					} else {
						resolve();
					}
				});
		});
	}

	// Set the pushToken of the user given the userId.
	public setPushToken(userId: string, token: string): void {
		this.get("users/" + userId)
			.then(ref => {
				ref.update({
					pushToken: token
				});
			})
			.catch(() => {});
	}

	// Remove the pushToken of the user given the userId.
	public removePushToken(userId: string): void {
		this.get("users/" + userId)
			.then(ref => {
				ref.update({
					pushToken: ""
				});
			})
			.catch(() => {});
	}*/
}