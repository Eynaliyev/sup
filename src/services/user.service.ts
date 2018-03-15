import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Message } from "../models/models";
import { User } from "../models/models";
import { Facebook } from "@ionic-native/facebook";
import { AngularFirestore } from "angularfire2/firestore";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { resolve } from "dns";
//import { Camera } from 'ionic-native';
@Injectable()
export class UserService {
	public currentUser: ReplaySubject<User> = new ReplaySubject<User>();
	private access_token = ``;

	constructor(
		private facebook: Facebook,
		public http: Http,
		private afs: AngularFirestore
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
					//graph request, for updating profile, setting it in the backend and nexting
					this.fetchGraphData().then(parsedData => {
						let userData = this.toUser(parsedData);
						this.currentUser.next(userData);
						this.updateUser(uid, parsedData).catch(error =>
							this.handleError(error)
						);
					});
				} else {
					//graph request, create new user with the return
					this.fetchGraphData().then(parsedData => {
						let userData = this.toUser(parsedData);
						this.currentUser.next(userData);
						this.createUser(parsedData).catch(error => this.handleError(error));
					});
				}
			});
		});
	}
	fetchGraphData(): Promise<any> {
		let url = `https://graph.facebook.com/v2.12/me?access_token=${
			this.access_token
		}&fields=id,name,gender,locale,picture.type(large),email,first_name,last_name`;
		return new Promise<any>(resolve => {
			this.http.get(url).subscribe(userInfo => {
				console.log("user info from fb api: ", JSON.stringify(userInfo));
				let parsedData = JSON.parse(userInfo["_body"]);
				resolve(parsedData);
			}),
				err => {
					this.handleError(err);
				};
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
			.then(() => this.setProfilePicture(user.id))
			.catch(error => this.handleError(error));
	}
	updateUser(id: string, userData: User): Promise<any> {
		let user = this.toUser(userData);
		return this.afs
			.doc(`users/${id}`)
			.update(user)
			.then(() => this.setProfilePicture(id))
			.catch(error => this.handleError(error));
	}
	toUser(data): User {
		let user = {
			id: data.id,
			firstName: data.first_name,
			lastName: data.last_name,
			contacts: [],
			friendRequests: [],
			blockedList: [],
			profilePhoto: {
				imgUrl: data.picture.data.url
			},
			gender: data.gender,
			photos: [
				{
					imgUrl: data.picture.data.url
				}
			]
		};
		return user;
	}
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
	}
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
	acceptFriendRequest(id: string) {
		/*
		1. [ ] add to each others’ contacts list
		2. [ ] create a new chatroom
		3. [ ] add to relationships list
		*/
		console.error(
			"acceptFriendRequest method in user service called, but has not been implemented yet"
		);
	}
	rejectFriendRequest(id: string) {
		/*[ ] just set to null?
		*/
		console.error(
			"rejectFriendRequest method in user service called, but has not been implemented yet"
		);
	}
	like(id: string) {
		/*
		1. [ ] if mutual - friendship
    1. [ ] in relationships collection
    2. [ ] in contacts list
    3. [ ] create a new chatroom
		2. [ ] if not, request
		*/
		console.error(
			"like method in user service called, but has not been implemented yet"
		);
	}
	//method for cancelling sentrequest
	unlike(id: string) {
		/*
		1. set the property in relationship to null
		2. remove from users' requests list
		3. [ ] add to relationships list
		*/
		console.error(
			"unlike method in user service called, but has not been implemented yet"
		);
	}
	addRequest(toId: string, requestedId: string) {
		/*
		1. [ ] add to the other users’ requests list
		2. [ ] add to relationships collection
		3. [ ] to the friendRequests list - to be able to cancel it
		*/
		console.error(
			"added request from ",
			toId,
			" to ",
			requestedId + ", but has not been implemented yet"
		);
	}
	removeRequest(id: string) {
		// find a url
		// set to true for currentUser
		console.error(
			"removeRequest method in user service called, but has not been implemented yet"
		);
	}
	block(id: string) {
		/*
		1. [ ] add to user’s blocked list
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
