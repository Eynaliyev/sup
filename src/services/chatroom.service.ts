import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from '../models/models';
import { Chatroom} from '../models/models';
import { UtilService } from '../shared/util.service';
import {Language} from '../models/models';
@Injectable()
export class ChatroomService {
  private chatroomByIdUrl;
  private messages: Message[];
  private chatrooms: Chatroom[];
  private languages: Language[];

	constructor(
    private http: Http,
    private utilService: UtilService
  )
  {
      this.messages = [{
          content: 'Hello from the other side.',
          date: new Date(),
          id: '123',
          senderId: '123',
          roomId: '321013',
          senderImage: 'assets/img/pic.png',
          senderName: 'Nicole',
          seen: []
      }];
      this.languages = [
        {
          id: '1',
          name: 'English'
        },{
          id: '2',
          name: 'Mandarin Chinese'
        },{
          id: '3',
          name: 'Spanish'
        },{
          id: '4',
          name: 'German'
        },{
          id: '5',
          name: 'French'
        },{
          id: '6',
          name: 'Russian'
        },{
          id: '7',
          name: 'Turkish'
        }
     ]
      this.chatrooms = [
        {
          id: '213',
          participants: [
            {
              id: '98',
              name: 'Megebbet',
              votes: 0,
              profileImgUrl: "assets/images/user.png",
            },
            {
              id: '98',
              name: 'Aflatun',
              votes: 0,
              profileImgUrl: "assets/images/user.png",
            },
            {
              id: '98',
              name: 'Gudret',
              votes: 0,
              profileImgUrl: "assets/images/user.png",
            },
            {
              id: '98',
              name: 'Thomas',
              votes: 0,
              profileImgUrl: "assets/images/user.png",
            },
            {
              id: '98',
              name: 'Eshgin',
              votes: 0,
              profileImgUrl: "assets/images/user.png",
            }
          ],
          messages: this.messages,
          blocked: [],
          warnings: []
        }
      ];
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
    getAvailableLanguages(): Observable<Language[]>{
      return new Observable(observer => {
        observer.next(this.languages);
      });
    }
}
