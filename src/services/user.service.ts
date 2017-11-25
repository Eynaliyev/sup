import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from '../models/models';
import { User} from '../models/models';
import {USER} from "./mock-user";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Camera } from 'ionic-native';
@Injectable()
export class UserService {
  private user:User;
	private currentUser:User;

constructor(
	private http: Http,
	private facebook: Facebook,
	private afs: AngularFirestore
) {
    this.user = USER;
  }
// should come from chatroom in the participants property for the chatroom
// should come from contacts property in get user by id for the contacts list
	getRandomUsers(number) {
		return this.http.get('https://randomuser.me/api/?results='+number)
		.map(res => res.json())
		.map(resp => resp.results)
	}
// get a specific User by id - that conforms to the user model
	getUserById(id: string): Observable<any>{//Observable<User> {
		return this.afs.doc(`users/${id}`).valueChanges();
  }
  getCurrentUser(): Observable<User>{
		return new Observable(observer => {
			observer.next(JSON.parse(localStorage.getItem('currentUser')));
		});
	}
  setCurrentUser(uid, dummy?): void{
		let currentUser: User;
		this.getUserById(uid).subscribe(user => {
			console.log('res from getUserById', JSON.stringify(user));
			// check if the user exists in backend
			if(user){
				// if yes,
				// set the current user in the localstorage to the one recovered from there
				currentUser = user;
				localStorage.setItem('currentUser', JSON.stringify(user));
				console.log("setting current user to:", JSON.stringify(localStorage.getItem('currentUser')));
			} else {
				// if no,
				// if dummy, just return the dummy data
				if(dummy){
					let userInfo = {
						"id": "10203432411524999",
						"name": "Rustam Eynaliyev",
						"gender": "male",
						"locale": "en_US",
						"picture": {
							"data": {
								"is_silhouette": false,
								"url": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13001075_10208279436177586_7844301951605599393_n.jpg?oh=1ee5a5b481be739dada9ad8fcff8e0d1&oe=5A6675B9"
							}
						},
						"email": "rustam.eynaliyev@gmail.com",
						"first_name": "Rustam",
						"last_name": "Eynaliyev"
					};
					this.createUser(userInfo);
				} else {
					// create the get user infor from facebook graph API
					this.facebook.api(`${uid}?fields=id,name,gender,locale,picture,email,first_name,last_name`,[])
					.then(userInfo => {
						console.log('user info from fb api: ', JSON.stringify(userInfo));
						// set the returned user in the backend
						this.createUser(userInfo);
					});
				}
			}
		});
	}
  // create user in firebase
  createUser(userCredentials) {
		// convert info to our model
		let user = this.toUser(userCredentials);
		// set it in the backend
		console.log('creating user: ', user );
		this.afs.doc(`/users/${user.id}`).set(user)
		.then(() => this.setProfilePicture(user.id) );
		// set current user in nativeStorage - pass the access token and email
		localStorage.setItem('currentUser', JSON.stringify(user));
	}
	toUser(data): User{
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
			photos: [{
				imgUrl: data.picture.data.url
			}]
		}
    return user;
  }
  setProfilePicture(uid: string): void{
		console.log('setProfilePicture called');
		// set picture to the larger one
		this.facebook.api(`${uid}/picture?type=large`,[])
		.then(photo => {
			console.log('photo from fb api: ', JSON.stringify(photo));
			// set the returned user in the backend
		this.afs.doc(`/users/${uid}/photoUrl`).set(photo.data.url + '?type=large');
		});
	}

  updateUser(userData: User){
		let userId = userData.id;
		let user = this.afs.doc(`users/${userId}`);
		user.update(userData);
  }
  addImage(userId: string, image){
		let photos = this.afs.collection(`users/${userId}/photos`);
    photos.add(image);
  }
  deleteImage(userId: string, imageUrl: string){
		let image = this.afs.doc(`users/${userId}/photos/${imageUrl}`);
    image.delete();
  }
  updateLastMessage(userId: string, contactRoomId: string, message: Message){
		// the data in contacts list should be organised by room IDs
    let lastMessage = this.afs.doc(`users/${userId}/contacts/${contactRoomId}/last-message`);
    lastMessage.update(message);
	}
	acceptFriendRequest(id: string){
		/*
		1. [ ] add to each others’ contacts list
		2. [ ] create a new chatroom
		3. [ ] add to relationships list
		*/
		console.log('acceptFriendRequest method in user service called');
	}
	rejectFriendRequest(id: string){
		/*[ ] just set to null?
		*/
		console.log('rejectFriendRequest method in user service called');
	}
  like(id: string){
		/*
		1. [ ] if mutual - friendship
    1. [ ] in relationships collection
    2. [ ] in contacts list
    3. [ ] create a new chatroom
		2. [ ] if not, request
		*/
		console.log('like method in user service called');
	}
	//method for cancelling sentrequest
	unlike(id: string){
				/*
		1. set the property in relationship to null
		2. remove from users' requests list
		3. [ ] add to relationships list
		*/
		console.log('unlike method in user service called');
	}
  addRequest(toId: string, requestedId: string){
		/*
		1. [ ] add to the other users’ requests list
		2. [ ] add to relationships collection
		3. [ ] to the friendRequests list - to be able to cancel it
		*/
    console.log('added request from ', toId, ' to ', requestedId);
  }
  removeRequest(id: string){
    // find a url
    // set to true for currentUser
    console.log('removeRequest method in user service called');
	}
	block(id: string){
		/*
		1. [ ] add to user’s blocked list
		2. [ ] set the relations collection
		3. [ ] remove from contacts if he’s there
		4. [ ] kick the user out of the chatroom and tell him he was kicked out
		*/
		console.log('block method in user service called');
	}
	unblock(id: string){
		/*
			1. [ ] set it back to null, without adding the false
			2. [ ] remove from blocked list
		*/
		console.log('unblock method in user service called');
	}
  hasLiked(fromId: string, toId: string){
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
      });
    });
    return promise;
  }
  // Update Profile Picture
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.db.object(`/users/${uid}/picture`);
      this.getPicture().then(image => {
        pictureRef.set(image);
      });
    });
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
      });
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
    });
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
      });
    });
    return promise;
  }
  // Update Profile Picture
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.db.object(`/users/${uid}/picture`);
      this.getPicture().then(image => {
        pictureRef.set(image);
      });
    });
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
      });
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
    });
  }
  */
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
