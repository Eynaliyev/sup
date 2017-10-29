import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from '../models/models';
import { Chatroom} from '../models/models';
import { UtilService } from '../shared/util.service';
import {Language} from '../models/models';
import {MESSAGES} from './mock-messages';
import {CHATROOMS} from './mock-chatrooms';
import {LANGUAGES} from './mock-languages';
@Injectable()
export class ChatroomService {
  private chatroomByIdUrl;
  private messages: Message[];
  private chatrooms: Chatroom[];
  private languages: Language[];

	constructor(
    private http: Http,
		private db: AngularFireDatabase,
		private afs: AngularFirestore,
    private utilService: UtilService
  )
  {
			this.messages = MESSAGES;
			this.languages = LANGUAGES;
      this.chatrooms = CHATROOMS;
  }
		getAvailableChatrooms(location, languages: Language[]): Observable<Chatroom[]> {
			// TO DO:
			// add a query by the number of participants
			// use firestore to sort by location and filter by availability
			return this.db.list(`chatrooms`).valueChanges();
		}
    getChatroomById(id): Observable<Chatroom>{
      // get full detailed data of the required chatroom
      return this.db.object(`chatrooms/${id}`).valueChanges();
		}
    joinChatroom(locaiton, languages: Language[]): Observable<string>{
			// perhaps should be a cloud function?
			// find available rooms
			// join it - https://angularfirebase.com/lessons/managing-firebase-user-relationships-to-database-records/#3-Data-that-Belongs-to-Multiple-Users
			// if no chatroom available create a new one., add gender equality, maleCount, femaleCount
      // add the user to the participants list for the room
      // get chatroom id - save it in local storage
      // get chatroom details by the id?
      // get messages for the room - first 15 for example
			// return the chatroom details
			return new Observable(observer => {
				observer.next('123');
			});
    }
    leaveChatroom(chatroomId: string, userId: string){
			// remove the user from participants list
			let participants = this.db.object(`chatrooms/${chatroomId}/participants/${userId}`);
			participants.remove();
      // publish a 'left the room  type of message' - a cloud function?
      // remove the chatroom id from local storage
    }
    updateSeen(chatroomId: string, messageId: string, userId: string){
			let messageSeen = this.afs.collection(`chatrooms/${chatroomId}/messages/${messageId}/seen`);
      messageSeen.add(userId);
    }
    sendMessage(chatroomId: string, message: Message){
			let messages = this.afs.collection(`chatrooms/${chatroomId}/messages`);
      messages.add(message);
    }
    // TO DO: implement actual paginated message getter function
    getMessages(chatroomId: string, start?, end?): Observable<any[]> {
      return this.afs.collection(`chatrooms/${chatroomId}/messages`).valueChanges();
    }
    /*
  // get a specific room from the list - get room reference
  getRoom(uid: string, id: string): FirebaseObjectObservable<any> {
    let roomRef = this.db.object(`/rooms/${uid},${id}`);
    return roomRef;
  }
  findRoom():Promise<any>{
    let res = new Promise<any>((resolve, reject) => resolve());
    return res;
  }
  leaveRoom(){

  }
  getMessages(uid: string, id: string): FirebaseListObservable<any> {
    let messagesRef = this.db.list(`/rooms/${uid},${id}/messages`);
    return messagesRef;
  }  // mapping to the room data used in-app
  toRoom(userId, otherId, messages): Room{
    // unique id based on the ids of two users
    let room = {
      id: userId,
      messages: messages,
      guysWaitlist: [],
      girlsWaitlist: [],
      location: [],
      menNum: 0,
      womenNum: 0,
      members: []
    }
    return room;
  }
  // create a room - add room references to both users
  addMessage(uid: string, otherId: string, message: Message): void {
    //push it to the rooms list
    let roomsRef = this.db.list(`/rooms/${uid},${otherId}/messages`);
    if (message.picture === null){
      roomsRef.push(message);
    } else {
      //assuming we have a picture so we'll need to store it in firebase
      //storage and save the URL as a picture property
      //generate a unique name for storing in firebase storage
      let uidName = this.utilService.guid();
      firebase.storage().ref(`/rooms/${uid},${otherId}/messages`)
      .child(`${uidName}.png`)
      .putString(message.picture, 'base64', {contentType: 'image/png'})
      .then((savedPicture) => {
        message.picture = savedPicture.downloadURL;
        roomsRef.push(message);
      });
    }
  }
  // remove a room from the list
  removeMessage(userId, otherId: string, messageId: string): void {
    //rooms list
    this.db.list(`/rooms/${userId},${otherId}/messages`).remove(messageId);
  }


    */
    getAvailableLanguages(): Observable<any[]>{
      return this.afs.collection(`languages`).valueChanges();
    }
}
