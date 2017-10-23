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
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Camera } from 'ionic-native';
@Injectable()
export class UserService {
  private user:User;
	private currentUser:User;

constructor(
  private http: Http,
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
		return this.afs.collection(`users/${id}`).valueChanges();
  }
  getCurrentUser(): Observable<any>{
		return new Observable(observer => {
			observer.next(localStorage.getItem('currentUser'));
		});
  }
  updateUser(userId: string, userData: User){
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
  updateLastMessage(userId: string, contactId: string, message: Message){
    let lastMessage = this.afs.doc(`users/${userId}/contacts/${contactId}/last-message`);
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
  */
  //set current user depending on whether there's somebody like this, or create a new one
  //check for presence of dummy data with arguments
  //if it's there, set current user to dummy data
  setCurrentUser(dummy?: any): void{
      localStorage.setItem('currentUser', JSON.stringify(firebase.auth().currentUser.providerData[0]));
      console.log("setting current user to:", localStorage.getItem('currentUser'));
      /*this.currentUser = this.toUser(firebase.auth().currentUser.providerData[0]);
      let userId = JSON.parse(localStorage.getItem('currentUser')).uid;
      console.log('checking if the user is there: ', userId);
      this.checkIfUserExists(userId);*/
	}
	/*
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
  //set current user depending on whether there's somebody like this, or create a new one
  //check for presence of dummy data with arguments
  //if it's there, set current user to dummy data
  setCurrentUser(dummy?: any): void{
    if (dummy) {
      console.log("setting current user to:", dummy);
      localStorage.setItem('currentUser', JSON.stringify(dummy));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(firebase.auth().currentUser.providerData[0]));
      this.currentUser = this.toUser(firebase.auth().currentUser.providerData[0]);
      let userId = JSON.parse(localStorage.getItem('currentUser')).uid;
      console.log('checking if the user is there: ', userId);
      this.checkIfUserExists(userId);
    }
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
