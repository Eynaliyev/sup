import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
//import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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
//    public db: AngularFireDatabase,
    private utilService: UtilService
  )
  {
			this.messages = MESSAGES;
			this.languages = LANGUAGES;
      this.chatrooms = CHATROOMS;
  }
		getAvailableChatrooms(location, languages: Language[]): Observable<Chatroom[]> {
      return new Observable(observer => {
        observer.next(this.chatrooms);
      });
    }
    getChatroomById(id): Observable<Chatroom>{
      // get full detailed data of the required chatroom
      return new Observable(observer => {
        setTimeout(() => {
          // temporary - need a different method
          let chatroom = this.chatrooms[0];
          observer.next(chatroom);
        },1800);
      });
    }
    joinChatroom(locaiton, languages: Language[]): Observable<string>{
			// find available rooms
			// join it - https://angularfirebase.com/lessons/managing-firebase-user-relationships-to-database-records/#3-Data-that-Belongs-to-Multiple-Users
      return new Observable(observer => {
        setTimeout(() => {
          let chatroom = this.getAvailableChatrooms(location, languages)
          .subscribe(chatrooms =>{
            let chatroomId = chatrooms[0].id;
            observer.next(chatroomId);
          });
        },1800);
      });
      // add the user to the participants list for the room
      // get chatroom id - save it in local storage
      // get chatroom details by the id?
      // get messages for the room - first 15 for example
      // return the chatroom details
    }
    leaveChatroom(){
      // remove the user from participants list
      // publish a 'left the room  type of message'
      // remove the chatroom id from local storage
      // go back to the meet-people page
    }
    voteAgainst(id){
      // substract 1 from the votes property on the participant
      // if the votes is -2 or lower, kick the user out - on the backend
    }
    updateSeen(messageId: string, id: string){
      //let index = this.messages.indexOf(message);
      //this.messages[index].seen.push(id);
    }
    sendMessage(roomId: string, message: Message){
      // add message to the messages list for the chatroom?
      this.messages.push(message);
    }
    // TO DO: implement actual paginated message getter function
    getMessages(chatroomId, start?, end?): Observable<Message[]> {
      return new Observable(observer => {
          observer.next(this.messages);
      });
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
    getAvailableLanguages(): Observable<Language[]>{
      return new Observable(observer => {
        observer.next(this.languages);
      });
    }
}
