import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from '../models/message.model';

import { User} from '../models/user.model';

@Injectable()
export class MessageService {
	//test url
    private MessagesUrl = 'app/Messages'; // URL to internal web api
    private usersByRoomUrl;
    private userByIdUrl;
    private messages: Message[];
	constructor(
		private http: Http,
        ) 
        {
            this.messages = [{
                content: 'Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
            },{
                content: 'Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
            },{
                content: 'Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
            },{
                content: 'Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
            },{
                content: 'Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
            }]

        }

    getRandomUsers(number) {
        return this.http.get('https://randomuser.me/api/?results='+number).map(res => res.json()).map(resp => resp.results)
    }
    
    getMessages(chatroomId){
        return new Promise(resolve => {
            resolve(this.messages);
        })
    }

}