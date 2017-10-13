import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Chatroom} from '../models/models';

@Injectable()
export class ChatroomService {
	//test url
	private ChatroomUrl = 'app/Chatrroms'; // URL to internal web api
    private chatroomByIdUrl;

	constructor(
		private http: Http,
		) { }

		getRandomChatroom() {
		}

}
