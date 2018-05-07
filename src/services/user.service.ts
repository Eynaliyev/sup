import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Message, Chatroom } from "../models/models";
import { User } from "../models/models";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from "angularfire2/firestore";
import { AngularFireDatabase } from "angularfire2/database";

import { ReplaySubject } from "rxjs/ReplaySubject";
//import { Camera } from 'ionic-native';

@Injectable()
export class UserService {
	public currentUser: ReplaySubject<User> = new ReplaySubject<User>();
	private access_token = ``;

	constructor(
		public http: Http,
		private afs: AngularFirestore,
		private db: AngularFireDatabase
	) {}
	// get a specific User by id - that conforms to the user model
	getUserById(id: string): Observable<any> {
		//Observable<User> {
		return this.afs.doc(`users/${id}`).valueChanges();
	}
	getCurrentUser(): ReplaySubject<User> {
		return this.currentUser;
	}
	setAccessToken(token): void {
		this.access_token = token;
	}
	//should return promise that resolves once the data can be returned
	setCurrentUser(usr): Promise<any> {
		return new Promise<any>(resolve => {
			let uid = usr["uid"];
			this.getUserById(uid).subscribe(user => {
				if (user) {
					this.currentUser.next(user);
					localStorage.setItem("currentUser", JSON.stringify(user));
				} else {
					//graph request, create new user with the return
					this.fetchGraphData().then(parsedData => {
						let userData = this.toUser(parsedData);
						this.currentUser.next(userData);
						localStorage.setItem("currentUser", JSON.stringify(userData));
						this.createUser(parsedData)
							.then(() => resolve(true))
							.catch(error => this.handleError(error));
					});
				}
			});
		});
	}
	fetchGraphData(): Promise<any> {
		let url = `https://graph.facebook.com/v2.12/me?access_token=${
			this.access_token
		}&fields=id,name,gender,locale,picture.type(large),email,first_name,last_name,birthday`;
		return new Promise<any>(resolve => {
			this.http.get(url).subscribe(
				userInfo => {
					console.log("user info from fb api: ", JSON.stringify(userInfo));
					let parsedData = JSON.parse(userInfo["_body"]);
					resolve(parsedData);
				},
				err => {
					this.handleError(err);
				}
			);
		});
	}
	// create user in firebase
	createUser(userCredentials): Promise<any> {
		// convert info to our model
		let user = this.toUser(userCredentials);
		// set it in the backend
		console.log("creating user: ", user);
		return this.afs
			.doc(`/users/${user.id}`)
			.set(user)
			.then(() => console.log("user set: ", user))
			.catch(error => this.handleError(error));
	}
	updateUser(userData: User): Promise<any> {
		localStorage.setItem("currentUser", JSON.stringify(userData));
		this.currentUser.next(userData);
		return this.afs
			.doc(`users/${userData.id}`)
			.set(userData, { merge: true })
			.then(() => console.log("updating info: ", userData.id))
			.catch(error => this.handleError(error));
	}
	toUser(data): User {
		let user = {
			id: data.id,
			birthday: data.birthday ? data.birthday : "",
			email: data.email ? data.email : "",
			firstName: data.first_name,
			lastName: data.last_name,
			about: data.about ? data.about : "",
			blockedList: data.blockedList ? data.blockedList : [],
			contacts: data.contacts ? data.contacts : [],
			requestsSent: data.requestsSent ? data.requestsSent : [],
			requestsReceived: data.requestsReceived ? data.requestsReceived : [],
			conversations: data.conversations ? data.conversations : [],
			groups: data.groups ? data.groups : [],
			pushToken: data.pushToken ? data.pushToken : [],
			notifications: data.notifications ? data.notifications : [],
			profilePhoto: data.picture.data.url
				? {
						imgUrl: data.picture.data.url
				  }
				: { imgUrl: "" },
			gender: data.gender ? data.gender : "",
			photos: data.picture.data.url
				? [
						{
							imgUrl: data.picture.data.url
						}
				  ]
				: [{ imgUrl: "" }]
		};
		return user;
	} /*
	setProfilePicture(uid: string): Promise<any> {
		console.log("setProfilePicture called");
		// set picture to the larger one
		return this.facebook
			.api(`${uid}/picture?type=large`, [])
			.then(photo => {
				// set the returned user in the backend
				this.afs
					.doc(`/users/${uid}/photoUrl`)
					.set(photo.data.url + "?type=large")
					.catch(error => this.handleError(error));
			})
			.catch(error => this.handleError(error));
	}*/
	addImage(userId: string, image): Promise<any> {
		let photos = this.afs.collection(`users/${userId}/photos`);
		return photos.add(image).catch(error => this.handleError(error));
	}
	deleteImage(userId: string, imageUrl: string): Promise<any> {
		let image = this.afs.doc(`users/${userId}/photos/${imageUrl}`);
		return image.delete().catch(error => this.handleError(error));
	}
	updateLastMessage(
		userId: string,
		contactRoomId: string,
		message: Message
	): Promise<any> {
		// the data in contacts list should be organised by room IDs
		let lastMessage = this.afs.doc(
			`users/${userId}/contacts/${contactRoomId}/last-message`
		);
		return lastMessage.update(message).catch(error => this.handleError(error));
	}
	//creates an individual room for the two users
	createConversation(fromId: string, toId: string) {
		let roomId = this.uniqueRelId(fromId, toId);
		let dbRef = this.db.object(`chatrooms/${roomId}`);
		let fromGender = JSON.parse(localStorage.getItem("currentUser")).gender;
		let conversation: Chatroom = {
			id: roomId,
			femaleParticipants: [],
			maleParticipants: [],
			messages: [],
			blocked: [],
			warnings: [],
			privateConversation: true
		};
		return dbRef.set(conversation);
	}
	removeConversation(id) {
		let dbRef = this.db.object(`conversations/${id}`);
		return dbRef.remove();
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
	/*
  getPicture(){
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };
    let promise = new Promise((resolve, reject) => {
      Camera.getPicture(options).then(imageData => {
        base64Picture = "data:image/jpeg;base64," + imageData;
        resolve(base64Picture);
        }, (error) => {
          reject(error);
      }).catch(error => this.handleError(error));
    });
    return promise;
  }
  // Update Profile Picture
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.db.object(`/users/${uid}/picture`);
      this.getPicture().then(image => {
        pictureRef.set(image);
      }).catch(error => this.handleError(error));
    }).catch(error => this.handleError(error));
  }
  updateProfile(user){
  }
  // Tests to see if /users/<userId> has any data.
  checkIfUserExists(id: string): void {
    var usersRef = firebase.database().ref('/users');
    usersRef.child(id).once('value', snapshot => {
      var exists = (snapshot.val() !== null);
      this.userExistsCallback(id, exists);
    });
  }
  // if user exists, do nothing, if not, create a new user
  userExistsCallback(userId: string, exists: boolean): void {
    if (exists) {
      console.log('user ' + userId + ' exists!');
    } else {
      console.log('saving new user to the database');
      this.createUser(this.currentUser);
    }
  }
  // Get Info of a Single User
  getUserProfile(id: string): FirebaseObjectObservable<User> {
    return this.db.object(`/users/${id}`);
  }
  //deleting a user from the database
  removeUser(id: string): void {
    let usersRef = this.db.list(`/users`)
    usersRef.remove(id);
  }
      /*
  //logic for contacts list page
  // get list of contacts of the current user
  getUserContacts(uid): FirebaseListObservable<any[]> {
    let contacts = this.db.list(`/users/${uid}/contacts`);
    return contacts;
  }
  // TO DO ADD LIKING< CREATING AND CHECKING FOR THEM
  // create a contact - add chat references to both users
  addContact(uid: string, otherId: string): void {
    let thisRef = this.db.list(`/users/${uid}/contacts`);
    //tgetting user data to set in contacts user
    this.getUserProfile(otherId).subscribe(user => {
      // mapping the data to the contact interface
      let otherUser = {
        id: otherId,
        name: user.name,
        photoUrl: user.photoUrl,
        age: user.age,
        lastText: "You successfully connected, time to say Hi! :)"
      }
      // seting the contact in this users' contacts list
      thisRef.push(otherUser);
      //the other user
      let otherRef = this.db.list(`/users/${otherId}/contacts`);
      let thisUser = {
        id: this.user.uid,
        name: this.user.name,
        photoUrl: this.user.photoUrl,
        age: this.user.age,
        lastText: "You successfully connected, time to say Hi! :)"
      };
      otherRef.push(thisUser);
      //push it to the chats list
      this.getUid().then(uid => {
        let chatsRef = this.db.list(`/chats/${uid},${otherId}`);
        chatsRef.push({
          text: "You successfully connected, time to say Hi! :)",
          type: "system-message",
          picture: '',
          time: firebase.database.ServerValue.TIMESTAMP
        })
      }).catch(error => this.handleError(error));
    });
  }
  // remove a chat from the list
  removeContact(id: string): void {
    //this user
    this.contacts.remove(id);
    //other user
    let otherRef = this.db.list(`/users/${id}/contacts`);
    this.getUid().then(uid => {
      otherRef.remove(uid);
      //chats list
      this.db.list(`/chats/${uid},${id}`).remove();
    }).catch(error => this.handleError(error));
  }
  /*
    getUid(): Promise<string>{
    let res = new Promise<any>((resolve, reject) => {
        console.log('uid in getUid(): ', JSON.parse(localStorage.getItem('currentUser')).uid);
        resolve(JSON.parse(localStorage.getItem('currentUser')).uid);
    });
    return res;
  }
  getCurrentUser(): Promise<User>{
    let res = new Promise<any>((resolve, reject) => {
        resolve(JSON.parse(localStorage.getItem('currentUser')));
    });
    return res;
  }
  getPicture(){
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };
    let promise = new Promise((resolve, reject) => {
      Camera.getPicture(options).then(imageData => {
        base64Picture = "data:image/jpeg;base64," + imageData;
        resolve(base64Picture);
        }, (error) => {
          reject(error);
      }).catch(error => this.handleError(error));
    });
    return promise;
  }
  // Update Profile Picture
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.db.object(`/users/${uid}/picture`);
      this.getPicture().then(image => {
        pictureRef.set(image);
      }).catch(error => this.handleError(error));
    }).catch(error => this.handleError(error));
  }
  updateProfile(user){
  }
  // Tests to see if /users/<userId> has any data.
  checkIfUserExists(id: string): void {
    var usersRef = firebase.database().ref('/users');
    usersRef.child(id).once('value', snapshot => {
      var exists = (snapshot.val() !== null);
      this.userExistsCallback(id, exists);
    });
  }
  // if user exists, do nothing, if not, create a new user
  userExistsCallback(userId: string, exists: boolean): void {
    if (exists) {
      console.log('user ' + userId + ' exists!');
    } else {
      console.log('saving new user to the database');
      this.createUser(this.currentUser);
    }
  }
  // Get Info of a Single User
  getUserProfile(id: string): FirebaseObjectObservable<User> {
    return this.db.object(`/users/${id}`);
  }
  // create user in firebase
  createUser(userCredentials): void {
    const userObservable = this.db.object(`/users/${userCredentials.uid}`);
    console.log('creating a new user in the back-end: ', userCredentials.uid);
    userObservable.set(this.toUser(this.currentUser));
  }
  toUser(data): User{
    let user = {
      uid: data.uid,
      name: data.displayName,
      email: data.email,
      photoUrl: data.photoURL,
      provider: data.providerId
    }
    return user;
  }
  //deleting a user from the database
  removeUser(id: string): void {
    let usersRef = this.db.list(`/users`)
    usersRef.remove(id);
  }
  //logic for contacts list page
  // get list of contacts of the current user
  getUserContacts(uid): FirebaseListObservable<any[]> {
    let contacts = this.db.list(`/users/${uid}/contacts`);
    return contacts;
  }
  // TO DO ADD LIKING< CREATING AND CHECKING FOR THEM
  // create a contact - add chat references to both users
  addContact(uid: string, otherId: string): void {
    let thisRef = this.db.list(`/users/${uid}/contacts`);
    //tgetting user data to set in contacts user
    this.getUserProfile(otherId).subscribe(user => {
      // mapping the data to the contact interface
      let otherUser = {
        id: otherId,
        name: user.name,
        photoUrl: user.photoUrl,
        age: user.age,
        lastText: "You successfully connected, time to say Hi! :)"
      }
      // seting the contact in this users' contacts list
      thisRef.push(otherUser);
      //the other user
      let otherRef = this.db.list(`/users/${otherId}/contacts`);
      let thisUser = {
        id: this.user.uid,
        name: this.user.name,
        photoUrl: this.user.photoUrl,
        age: this.user.age,
        lastText: "You successfully connected, time to say Hi! :)"
      };
      otherRef.push(thisUser);
      //push it to the chats list
      this.getUid().then(uid => {
        let chatsRef = this.db.list(`/chats/${uid},${otherId}`);
        chatsRef.push({
          text: "You successfully connected, time to say Hi! :)",
          type: "system-message",
          picture: '',
          time: firebase.database.ServerValue.TIMESTAMP
        })
      }).catch(error => this.handleError(error));
    });
  }
  // remove a chat from the list
  removeContact(id: string): void {
    //this user
    this.contacts.remove(id);
    //other user
    let otherRef = this.db.list(`/users/${id}/contacts`);
    this.getUid().then(uid => {
      otherRef.remove(uid);
      //chats list
      this.db.list(`/chats/${uid},${id}`).remove();
    }).catch(error => this.handleError(error));
  }
  */
	private handleError(error: any): Promise<any> {
		console.error("An error occurred", error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
