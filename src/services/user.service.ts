import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User} from '../models/models';

@Injectable()
export class UserService {

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
	getUserById(id): Observable<User> {
    //url constructed from id
    let url = '';
		return this.http.get(url)
    .map(response => {
				console.log('response.json().data for getting User by id', response.json().data);
				return response.json().data as User;
			}).catch(err => {
				this.handleError(err);
				return null;
			})
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
