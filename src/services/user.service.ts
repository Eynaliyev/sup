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
/*
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera } from 'ionic-native';
*/
@Injectable()
export class UserService {
/*
  private contacts: FirebaseListObservable<any[]>;
  private currentUser: User;
  private user: User = JSON.parse(localStorage.getItem('currentUser'));
*/
  user = {
    id:'1234',
    firstName: 'Rustam',
    lastName: 'Eynaliyev',
    relationshipStatus: 'single',
    universityName: 'Indiana University, Bloomington',
    birthday: '20/07/1992',
    gender: 'male',
    about: 'Creator of sup/Mypeeps',
    company: 'Luxoft',
    profession: 'Software Developer',
    currentLocation: 'Baku, Azerbaijan',
    currentCoords: [50.0647, 19.9450],
    age: 25,
    contacts: [
      {
        id:'1234',
        name: 'Rustam Eynaliyev',
        profileImgUrl: 'assets/users/images/1/2.jpg',
        roomId: 'string',
        lastMessage: {
          content: "What's up my man?!",
          date: this.createDate(10000),
          id: '123',
          senderId: '432',
          roomId: '123',
          senderName: 'Ehmed',
          senderImage: 'aef',
          seen: []
        }
      },{
        id:'1223',
        name: 'Bahram Koroglu',
        profileImgUrl: 'assets/users/images/1/3.jpg',
        roomId: 'string',
        lastMessage: {
          content: "What's up my man?!",
          date: this.createDate(200000),
          id: '123',
          senderId: '432',
          roomId: '123',
          senderName: 'Ehmed',
          senderImage: 'aef',
          seen: ['1234']
        }
      },{
        id:'1114',
        name: 'Aflatun Aliyev',
        profileImgUrl: 'assets/users/images/1/4.jpg',
        roomId: 'string',
        lastMessage: {
          content: "What's up my man?!",
          date: this.createDate(500),
          id: '123',
          senderId: '432',
          roomId: '123',
          senderName: 'Ehmed',
          senderImage: 'aef',
          seen: ['124']
        }
      },{
        id:'1464',
        name: 'Angelo Alexander',
        profileImgUrl: 'assets/users/images/1/1.jpg',
        roomId: 'string',
        lastMessage: {
          content: "What's up my man?!",
          date: this.createDate(700000),
          id: '123',
          senderId: '432',
          roomId: '123',
          senderName: 'Ehmed',
          senderImage: 'aef',
          seen: ['123']
        }
      },{
        id:'6434',
        name: 'Kirito Maxilimillian',
        profileImgUrl: 'assets/users/images/1/2.jpg',
        roomId: 'string',
        lastMessage: {
          content: "What's up my man?!",
          date: new Date(),
          id: '123',
          senderId: '432',
          roomId: '123',
          senderName: 'Ehmed',
          senderImage: 'aef',
          seen: ['125']
        }
      }
    ],
    friendRequests: ['6434'],
    currentRoomId: '123',
    socialProfiles: [],
    profileImgUrl: 'assets/img/pic.png',
    photos: [
      { imgUrl: 'assets/users/images/1/1.jpg' },
      { imgUrl: 'assets/users/images/1/2.jpg' },
      { imgUrl: 'assets/users/images/1/3.jpg' },
      { imgUrl: 'assets/users/images/1/4.jpg' }
    ],
    interests: [],
    languages: [
      {
        id: '1',
        name: 'English'
      },
      {
        id: '2',
        name: 'Mandarin Chinese'
      }
    ]
  };
  //a dummy method for ocming up with different dates
  createDate(n){
    let time = new Date().getTime() - n;
    let date = new Date(time);
    return date;
  }

	constructor(
    private http: Http,
    //public db: AngularFireDatabase
		) { }
// should come from chatroom in the participants property for the chatroom
// should come from contacts property in get user by id for the contacts list
	getRandomUsers(number) {
		return this.http.get('https://randomuser.me/api/?results='+number)
		.map(res => res.json())
		.map(resp => resp.results)
	}
// get a specific User by id - that conforms to the user model
	getUserById(id): Observable<User>{//Observable<User> {
    //url constructed from id
    let url = '';
    let env = this;
    return new Observable(observer => {
      observer.next(env.user);
    });
    /*
		return this.http.get(url)
    .map(response => {
				console.log('response.json().data for getting User by id', response.json().data);
				return response.json().data as User;
			}).catch(err => {
				this.handleError(err);
				return null;
      })
      */
  }
  getCurrentUser(): Observable<User>{//Observable<User> {
    //url constructed from id
    let url = '';
    let env = this;
    return new Observable(observer => {
      observer.next(env.user);
    });
  }
  updateUser(user){
    this.user = user;
  }
  addImage(image){
    this.user.photos.push(image);
  }
  deleteImage(image){
    let index = this.user.photos.indexOf(image);
    this.user.photos.splice(index, 1);
  }
  updateLastMessage(roomId: string, message: Message){
    let contact = this.user.contacts.filter( contact => contact.id === roomId)[0];
    contact.lastMessage = message;
  }
  like(id){
    // check if the other person like them, if yes, remove theh relationship from likes list and add to the friends list
    this.getCurrentUser()
    .subscribe(currentUser => {
      this.getUserById(id)
      .subscribe(user => {
        if(user.friendRequests.indexOf(currentUser.id) !== -1){
          //remove the request
          this.removeRequest(user.id);
          // add to both contacts
          this.addFriend(currentUser.id, user.id);
        } else {
          this.addRequest(currentUser.id, user.id);
        }
      })
    });
    // if not, add to the likes list
  }
  addRequest(toId: string, requestedId: string){
    console.log('added request from ', toId, ' to ', requestedId);
  }
  addFriend(id: string, otherId: string){
    console.log('added request from ', id, ' to ', otherId);
  }
  removeRequest(id: string){
    console.log('removeRequest method in user service called');
  }
  removeFriend(id: string){
    console.log('removeFriend method in user service called');
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
