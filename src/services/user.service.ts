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

@Injectable()
export class UserService {
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
    languages: []
  };
  //a dummy method for ocming up with different dates
  createDate(n){
    let time = new Date().getTime() - n;
    let date = new Date(time);
    return date;
  }

	constructor(
		private http: Http,
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
    //url constructed with id
    let url = '';
    // check if the other person like them, if yes, remove theh relationship from likes list and add to the friends list
    // if not, add to the likes list
  }
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
