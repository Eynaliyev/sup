import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
    contacts: [],
    phoneNumber: 'xrx-ysy-zzzz',
    email: 'r.e@g.com',
    currentRoomId: '123',
    socialProfiles: [],
    profilePhoto: 'assets/img/pic.png',
    photos: [
      { id: '123', imgUrl: 'assets/users/images/1/1.jpg' },
      { id: '123', imgUrl: 'assets/users/images/1/2.jpg' },
      { id: '123', imgUrl: 'assets/users/images/1/3.jpg' },
      { id: '123', imgUrl: 'assets/users/images/1/4.jpg' }
    ],
    interests: []
  };

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
	getUserById(id): Promise<User>{//Observable<User> {
    //url constructed from id
    let url = '';
    return new Promise(resolve => {
      resolve(this.user);
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
  getCurrentUser(): Promise<User>{//Observable<User> {
    //url constructed from id
    let url = '';
    return new Promise(resolve => {
      resolve(this.user);
    });
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
