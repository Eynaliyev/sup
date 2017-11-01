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
import {LANGUAGES} from './mock-languages';
@Injectable()
export class ChatroomService {
  private messages: Message[];
  private chatrooms: Chatroom[];
  private languages: Language[];

	constructor(
    private http: Http,
		private db: AngularFireDatabase,
		private afs: AngularFirestore,
		private utilService: UtilService
  )
  {  }
		getAvailableChatrooms(location, language: Language): Observable<any[]> {
			console.log('joinChatroom called');
			let gender = JSON.parse(localStorage.getItem('currentUser')).gender;
			let otherGender;
			if(gender === 'male'){
				otherGender = 'femaleParticipants';
			} else {
				otherGender = 'maleParticipants';
			}
			// TO DO:
			// 1. [ ] get all rooms
			return this.db.list(`chatrooms`).valueChanges();
			// .filter(room => room[otherGender].length < 2)
			// .filter(relevantRooms => releaseEvents.language === language);
			// 2. [ ] filter out rooms with less than 3 participants of opposite gender
			// 3. [ ] filter by language
			// 4. [ ] sort by distance from user - calculate average from users’ locations
			// 5. [ ] join the room
			// 6. [ ] if none create room
			// with given language and add the user to the participants list of his gender to it
		}
    getChatroomById(id): Observable<Chatroom>{
      // get full detailed data of the required chatroom
      return this.db.object(`chatrooms/${id}`).valueChanges();
		}
    joinChatroom(location, language: Language): Observable<any>{
			console.log('joinChatroom called');
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
				this.getAvailableChatrooms(location, language)
				.subscribe(chatrooms => {
					if(chatrooms.length !== 0){
						console.log('available chatrooms: ', chatrooms);
						observer.next(chatrooms[0]);
					} else {
						this.createChatroom(location, language)
						.then(() => this.getAvailableChatrooms(location, language));
					}
				},
				err => {
					console.error(err);
				});
			});
		}
		createChatroom(location, language){
			console.log('createChatroom called');
			let gender = JSON.parse(localStorage.getItem('currentUser')).gender;
			let thisGender;
			if(gender === 'female'){
				thisGender = 'femaleParticipants';
			} else {
				thisGender = 'maleParticipants';
			}
			let chatroom = {
				femaleParticipants: [],
				maleParticipants: [],
				language: language,
				messages: [],
				blocked: [],
				warnings: []
			};
			let user = JSON.parse(localStorage.getItem('currentUser'));
			chatroom[thisGender].push({
				id: user.id,
				name: user.firstName + ' ' + user.lastName,
				votes: 0,
				profileImgUrl: user.profilePhoto.imgUrl
			});
			return this.db.list(`/chatrooms`).push(chatroom);
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
