
import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from '../models/models';

import { User} from '../models/models';
import { UtilService } from '../shared/util.service';

@Injectable()
export class MessageService {
	//test url
    private MessagesUrl = 'app/Messages'; // URL to internal web api
    private usersByRoomUrl;
    private userByIdUrl;
    private messages: Message[];

	constructor(
        private http: Http,
        private utilService: UtilService
        )
        {
            this.messages = [{
                content: 'Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 123,
                roomId: 321013,
                senderImage: 'assets/img/pic.png',
                senderName: 'Nicole'
            },{
                content: 'Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 331,
                roomId: 321013,
                senderImage: 'assets/img/pic2.png',
                senderName: 'Karolina'
            },{
                content: 'Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
                senderImage: 'assets/img/pic3.png',
                senderName: 'Lisa'
              },{
                content: 'Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 321,
                roomId: 321013,
                senderImage: 'assets/img/pic2.png',
                senderName: 'Lisa'
              },{
                content: 'Hello from the other side.',
                date: new Date(),
                id: 123,
                senderId: 123,
                roomId: 321013,
                senderImage: 'assets/img/pic.png',
                senderName: 'Nicole'
              }];

        }
    // TO DO: implement actual paginated message getter function
    getMessages(chatroomId, start?, end?): Promise<Message[]> {
        return new Promise(resolve => {
            resolve(this.messages);
        });
    }

}
