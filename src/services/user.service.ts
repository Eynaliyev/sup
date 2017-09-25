import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User} from '../models/user.model';

@Injectable()
export class UserService {
	//test url
	private UsersUrl = 'app/Users'; // URL to internal web api
  private usersByRoomUrl;
	private userByIdUrl;

	constructor(
		private http: Http,
		) { }

		getRandomUsers(number) {
			return this.http.get('https://randomuser.me/api/?results='+number).map(res => res.json()).map(resp => resp.results)
		}
// get a specific User
/*
	getUserById(id): Observable<User> {
		return this.http.get(this.userByIdUrl)
    .subscribe(response => {
				console.log('response.json().data for getting User by id', response.json().data);
				return response.json().data as User;
			}).catch(err => {
				this.handleError(err);
				return null;
			})
	}
	getUsersByUChatroomId(id): Promise<any> {
		let usersByChatroomUrl = this.usersByRoomUrl + '&chatroomId=${id}`;
		return this.http.get(usersByChatroomUrl)
		.subscribe(response => {
				console.log('response.json().data for getting Users by chatroom id', response.json().data);
				return response.json().data;
		}).catch(err => {
			this.handleError(err);
			return null;
		})
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
		*/
}
